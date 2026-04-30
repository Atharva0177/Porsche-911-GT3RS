"use client"
import React, { useEffect, useRef, useState } from 'react'

interface ScrollyCanvasProps {
  frameCount?: number
  basePath?: string
  containerRef?: React.RefObject<HTMLElement | null>
}

const defaultFrames = 192
const assetVersion = '2026-04-29-2'

export default function ScrollyCanvas({ frameCount = defaultFrames, basePath = '/sequence/frame_' }: ScrollyCanvasProps){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const previousFrameRef = useRef<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    isMobileRef.current = typeof window !== 'undefined' ? window.innerWidth < 768 : false
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Preload frames
    const frames: HTMLImageElement[] = []
    const promises: Promise<void>[] = []
    for(let i=0;i<frameCount;i++){
      const idx = String(i).padStart(3, '0')
      const src = `${basePath}${idx}.webp?v=${assetVersion}`
      const img = new Image()
      img.src = src
      frames.push(img)
      promises.push(new Promise((res) => {
        img.onload = () => res()
        img.onerror = () => res()
      }))
    }

    Promise.all(promises).then(() => {
      imagesRef.current = frames
      setLoaded(true)
      drawFrame(0)
    })

    function drawFrame(index:number){
      const canvas = canvasRef.current
      const img = imagesRef.current[index]
      if(!canvas) return
      // defensive: ensure image is loaded and not broken
      const isValidImage = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth && img.naturalHeight
      let drawImg: HTMLImageElement | undefined = img
      if(!isValidImage(img)){
        // try to find nearest valid image as a fallback
        for(let j = 0; j < imagesRef.current.length; j++){
          const candidate = imagesRef.current[j]
          if(isValidImage(candidate)){
            drawImg = candidate
            break
          }
        }
      }
      if(!isValidImage(drawImg)){
        // nothing valid to draw yet; clear canvas and exit safely
        const ctxEmpty = canvas.getContext('2d')
        if(ctxEmpty){
          const cw = Math.max(1, canvas.clientWidth)
          const ch = Math.max(1, canvas.clientHeight)
          ctxEmpty.clearRect(0,0,cw,ch)
        }
        return
      }
      const ctx = canvas.getContext('2d')
      if(!ctx) return

      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      const cw = Math.max(1, canvas.clientWidth)
      const ch = Math.max(1, canvas.clientHeight)
      canvas.width = Math.floor(cw * dpr)
      canvas.height = Math.floor(ch * dpr)
      canvas.style.width = `${cw}px`
      canvas.style.height = `${ch}px`
      ctx.setTransform(dpr,0,0,dpr,0,0)

      // contain on mobile so the car stays visible; cover on larger screens for the cinematic crop
      const iw = drawImg.naturalWidth
      const ih = drawImg.naturalHeight
      const baseScale = isMobileRef.current ? Math.min(cw/iw, ch/ih) : Math.max(cw/iw, ch/ih)
      // apply a subtle extra zoom on mobile to bring the car closer
      const mobileZoomFactor = 1.08
      const scale = isMobileRef.current ? baseScale * mobileZoomFactor : baseScale
      const dw = iw * scale
      const dh = ih * scale
      let dx = (cw - dw) / 2
      let dy = (ch - dh) / 2

      if(isMobileRef.current){
        // slightly lift the car on mobile view to improve composition
        dy -= ch * 0.06
      }

      // no pointer parallax — draw image centered

      // lightweight motion-blur: draw previous frame faintly behind current when stepping quickly
      ctx.clearRect(0,0,cw,ch)
      const prevIdx = previousFrameRef.current
      if(typeof prevIdx === 'number' && prevIdx !== index){
        const prevImg = imagesRef.current[prevIdx]
        if(prevImg && prevImg.complete && prevImg.naturalWidth){
          ctx.globalAlpha = 0.28
          ctx.drawImage(prevImg as HTMLImageElement, dx, dy, dw, dh)
          ctx.globalAlpha = 1
        }
      }
      ctx.drawImage(drawImg as HTMLImageElement, dx, dy, dw, dh)
      previousFrameRef.current = index
    }

    if(!prefersReduced){
      function handleScroll(){
        // Calculate scroll progress based on full document scroll
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
        
        const idx = Math.min(frameCount-1, Math.max(0, Math.floor(scrollProgress * (frameCount-1))))
        if(currentFrameRef.current !== idx){
          const lastIdx = currentFrameRef.current
          currentFrameRef.current = idx
          // update layered depth CSS vars for subtle parallax of UI
          try{
            const layer1 = (scrollProgress * 6).toFixed(2) // small offset px
            const layer2 = (scrollProgress * 12).toFixed(2)
            document.documentElement.style.setProperty('--layer-1-offset', `${layer1}px`)
            document.documentElement.style.setProperty('--layer-2-offset', `${layer2}px`)
          }catch(e){}
          requestAnimationFrame(()=> drawFrame(idx))
        }
        // subtle camera zoom based on scroll progress (1.0 -> 1.03 on desktop, slightly stronger on mobile)
        try{
          const base = 1 + (Math.sin(scrollProgress * Math.PI) * 0.03)
          const zoom = isMobileRef.current ? base + 0.04 : base
          document.documentElement.style.setProperty('--camera-zoom', String(zoom))
        }catch(e){}
      }

      function handleResize(){
        isMobileRef.current = window.innerWidth < 768
        requestAnimationFrame(() => drawFrame(currentFrameRef.current))
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
      // keyboard scrubbing: left/right arrows to step frames
      function handleKey(e: KeyboardEvent){
        if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
          const next = Math.max(0, currentFrameRef.current - 1)
          currentFrameRef.current = next
          requestAnimationFrame(()=> drawFrame(next))
        }else if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
          const next = Math.min(frameCount - 1, currentFrameRef.current + 1)
          currentFrameRef.current = next
          requestAnimationFrame(()=> drawFrame(next))
        }
      }
      window.addEventListener('keydown', handleKey)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('keydown', handleKey)
        window.removeEventListener('resize', handleResize)
      }
    }

  }, [basePath, frameCount])

  // Fixed background canvas that persists throughout entire page
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none canvas-viewport">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {!loaded && <div className="absolute inset-0 flex items-center justify-center text-muted">Loading...</div>}
    </div>
  )
}
