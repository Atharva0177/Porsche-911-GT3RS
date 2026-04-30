"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface IntroSplashProps {
  durationMs?: number
}

export default function IntroSplash({ durationMs = 8000 }: IntroSplashProps){
  type MotionDivProps = React.ComponentProps<'div'> & MotionProps
  type MotionImgProps = React.ComponentProps<'img'> & MotionProps

  const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
    MotionDivProps & React.RefAttributes<HTMLDivElement>
  >

  const MotionImg = motion.img as unknown as React.ForwardRefExoticComponent<
    MotionImgProps & React.RefAttributes<HTMLImageElement>
  >

  return (
    <MotionDiv
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.96, filter: 'blur(6px)', transition: { duration: 0.9, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      <MotionDiv
        initial={{ y: 12, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl px-6 text-center"
      >
        <MotionImg
          src="/porsche.png"
          alt="Porsche"
          initial={{ y: 6, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mx-auto mb-1 w-56 sm:w-72 md:w-96 lg:w-[480px]"
          style={{ filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.7))' }}
        />
        <div className="mt-6">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <MotionDiv
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-white/10"
            />
            <MotionDiv
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
              className="relative h-full origin-left bg-gradient-to-r from-[#CC0000] via-[#FF3333] to-[#ffffff] shadow-[0_0_18px_rgba(255,51,51,0.65)]"
            />
            <MotionDiv
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent mix-blend-screen"
            />
          </div>
          <div className="mt-3 text-xs uppercase tracking-[0.35em] text-white/60">Loading</div>
        </div>
      </MotionDiv>
    </MotionDiv>
  )
}
