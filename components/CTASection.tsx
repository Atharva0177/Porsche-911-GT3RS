"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

type MotionDivProps = React.ComponentProps<'div'> & MotionProps
type MotionHeadingProps = React.ComponentProps<'h2'> & MotionProps
type MotionParagraphProps = React.ComponentProps<'p'> & MotionProps

const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionDivProps & React.RefAttributes<HTMLDivElement>
>

const MotionH2 = motion.h2 as unknown as React.ForwardRefExoticComponent<
  MotionHeadingProps & React.RefAttributes<HTMLHeadingElement>
>

const MotionP = motion.p as unknown as React.ForwardRefExoticComponent<
  MotionParagraphProps & React.RefAttributes<HTMLParagraphElement>
>

export default function CTASection(){
  return (
    <section className="py-20 px-6 bg-transparent border-t border-accent/20">
      <div className="max-w-5xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <MotionH2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-display-md font-display text-white mb-4"
          >
            EXPERIENCE THE ULTIMATE
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="text-muted-light text-lg mb-12 font-body max-w-2xl mx-auto"
          >
            Every athlete knows the absolute willingness to question everything is crucial to achieving a top performance
          </MotionP>

          {/* <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent hover:bg-accent-light text-black font-display text-lg tracking-wider transition-all rounded-lg btn-glint shadow-lg"
            >
              CONFIGURE NOW
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent/10 font-display text-lg tracking-wider transition-all rounded-lg btn-glint"
            >
              FIND A DEALER
            </motion.button>
          </motion.div> */}
        </MotionDiv>
      </div>
    </section>
  )
}
