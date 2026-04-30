"use client"
import React, { useEffect } from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface OverlayProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export default function Overlay({ containerRef }: OverlayProps){
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(1, progress))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  type MotionDivProps = React.ComponentProps<'div'> & MotionProps
  const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
    MotionDivProps & React.RefAttributes<HTMLDivElement>
  >

  // Phase transforms - map scroll progress to values
  // Make the hero title fully visible at page load (scrollProgress = 0)
  const introOpacity = 1
  const introScale = 1

  const specsOpacity = scrollProgress < 0.25 ? 0 : scrollProgress > 0.55 ? 1 : (scrollProgress - 0.25) / 0.3
  const specsX = scrollProgress < 0.25 ? -40 : scrollProgress > 0.55 ? 0 : -40 + (scrollProgress - 0.25) / 0.3 * 40

  const outroX = scrollProgress < 0.65 ? 40 : scrollProgress > 0.9 ? 0 : 40 - (scrollProgress - 0.65) / 0.25 * 40
  const outroOpacity = scrollProgress < 0.65 ? 0 : scrollProgress > 0.9 ? 1 : (scrollProgress - 0.65) / 0.25

  const introStyle = { opacity: introOpacity, scale: introScale } as unknown as React.CSSProperties
  const specsStyle = { opacity: specsOpacity, x: specsX } as unknown as React.CSSProperties
  const outroStyle = { x: outroX, opacity: outroOpacity } as unknown as React.CSSProperties
  const accentWidth = scrollProgress < 0.65 ? '0%' : scrollProgress > 0.9 ? '100%' : ((scrollProgress - 0.65) / 0.25 * 100) + '%'
  const accentStyle = { width: accentWidth } as unknown as React.CSSProperties

  useEffect(()=>{
    // ensure will-change applied to motion elements for GPU compositing
    // nothing else to do here
  }, [])

  // pointer parallax removed — overlay remains static relative to scroll

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Top-right highlight logo */}
      <MotionDiv initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="absolute right-4 top-8 sm:right-6 sm:top-10 md:right-14 md:top-2 will-change-composite depth-layer depth-1">
        <div className="pointer-events-auto">
          <img src="/porsche.png" alt="Porsche" className="w-20 sm:w-28 md:w-56 lg:w-64 object-contain drop-shadow-lg" />
        </div>
      </MotionDiv>
      {/* Hero (top-left) — moved from center into the highlighted area */}
      <MotionDiv style={introStyle} className="absolute left-4 top-32 w-[88vw] max-w-sm sm:left-1/2 sm:-translate-x-1/2 sm:top-36 md:left-24 md:top-44 md:w-auto md:max-w-md md:translate-x-0 will-change-composite depth-layer depth-1">
        <div className="text-left text-white will-change-composite max-w-md">
          <div className="hero-panel inline-block depth-1" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-display-lg leading-none mb-3 md:mb-4 tracking-wider hero-title">
              <span className="hero-title-part--white">911 GT3&nbsp;</span>
              <span className="hero-title-part--red">RS</span>
            </h1>
            <p className="mt-1 text-sm sm:text-base md:text-xl font-body tracking-wide text-accent-light">The last of its kind.</p>
            <MotionDiv className="h-1 w-12 sm:w-16 gradient-accent mt-3 md:mt-4" style={{ marginLeft: 0 }} />
          </div>
        </div>
      </MotionDiv>

      {/* cards moved to ModelVariants section */}

      {/* Bottom progress bar */}
      <div className="fixed left-0 right-0 bottom-0 h-[1px] bg-white z-20" style={{ width: (scrollProgress * 100) + '%', transition: 'width 0.05s ease-out' }} />
    </div>
  )
}
