"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ScrollyCanvas from '../components/ScrollyCanvas'
import Overlay from '../components/Overlay'
import SpecHUD from '../components/SpecHUD'
import PerformanceMetrics from '../components/PerformanceMetrics'
import TechnicalSpecs from '../components/TechnicalSpecs'
import HeritageLegacy from '../components/HeritageLegacy'
import CTASection from '../components/CTASection'
import IntroSplash from '../components/IntroSplash'
import { useState, useEffect } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

const ModelVariants = dynamic(() => import('../components/ModelVariants'), {
  ssr: false
})

type MotionSectionProps = React.ComponentProps<'section'> & MotionProps

const MotionSection = motion.section as unknown as React.ForwardRefExoticComponent<
  MotionSectionProps & React.RefAttributes<HTMLElement>
>

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.08
    }
  }
}

export default function Page(){
  const [showIntro, setShowIntro] = useState(true)

  useEffect(()=>{
    const t = setTimeout(()=> setShowIntro(false), 10000)
    function onKey() { setShowIntro(false) }
    function onClick(){ setShowIntro(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onClick)
    return ()=>{
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onClick)
    }
  },[])

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <IntroSplash key="intro" durationMs={10000} />}
      </AnimatePresence>

      {!showIntro && (
        <main className="bg-transparent overflow-x-hidden">
          <ScrollyCanvas />
          <div className="lighting-overlay" />
          <div className="dust-overlay" />

          {/* Hero section with overlay */}
          <section className="relative w-full min-h-screen flex items-center justify-center z-10">
            <Overlay containerRef={undefined} />
            <SpecHUD containerRef={undefined} />
          </section>

          <section className="relative z-10">
            <MotionSection
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              className="py-20 px-6 max-w-6xl mx-auto"
            >
              <Suspense fallback={<div className="text-center py-20">Loading variants…</div>}>
                <ModelVariants />
              </Suspense>
            </MotionSection>

            <MotionSection variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
              <HeritageLegacy />
            </MotionSection>

            <MotionSection variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
              <PerformanceMetrics />
            </MotionSection>

            <MotionSection variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
              <TechnicalSpecs />
            </MotionSection>

            <MotionSection variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0px -10% 0px' }}>
              <CTASection />
            </MotionSection>
          </section>
        </main>
      )}
    </>
  )
}
