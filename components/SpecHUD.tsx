"use client"
import React, { useEffect, useState } from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface SpecHUDProps {
  containerRef?: React.RefObject<HTMLElement | null>
  frameCount?: number
}

export default function SpecHUD({ containerRef, frameCount = 192 }: SpecHUDProps){
  const [visible, setVisible] = useState(false)
  const [angle, setAngle] = useState(0)

  type MotionDivProps = React.ComponentProps<'div'> & MotionProps
  const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
    MotionDivProps & React.RefAttributes<HTMLDivElement>
  >

  useEffect(()=>{
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
      setVisible(scrollProgress > 0 && scrollProgress < 1)
      setAngle(Math.round(scrollProgress * 360))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, scale: visible ? 1 : 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-6 bottom-6 z-30 text-sm font-mono text-gray-300 bg-black/30 px-3 py-2 rounded-md"
    >
      <div className="text-xs text-gray-400">Rotation</div>
      <div className="mt-1 text-white">{angle}°</div>
    </MotionDiv>
  )
}
