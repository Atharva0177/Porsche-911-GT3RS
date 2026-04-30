"use client"
import React, { useEffect, useState } from 'react'
import { motion, type MotionProps } from 'framer-motion'

export default function Navbar(){
  type MotionDivProps = React.ComponentProps<'div'> & MotionProps
  type MotionButtonProps = React.ComponentProps<'button'> & MotionProps

  const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
    MotionDivProps & React.RefAttributes<HTMLDivElement>
  >

  const MotionButton = motion.button as unknown as React.ForwardRefExoticComponent<
    MotionButtonProps & React.RefAttributes<HTMLButtonElement>
  >

  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    function onScroll(){
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled? 'bg-black/90 backdrop-blur-xl border-b border-accent/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-xl tracking-widest"
        >
          PORSCHE
        </MotionDiv>
        <div className="flex items-center space-x-6">
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sm font-body tracking-wider hidden sm:block"
          >
            911 GT3 RS
          </MotionDiv>
          <MotionButton 
            whileHover={{ scale: 1.05, backgroundColor: 'var(--accent)' }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 border border-accent text-accent hover:text-black font-display text-xs tracking-widest transition-colors rounded-md"
          >
            CONFIGURE
          </MotionButton>
        </div>
      </div>
    </nav>
  )
}
