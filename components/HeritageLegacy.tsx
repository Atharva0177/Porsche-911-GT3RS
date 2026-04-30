"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

type MotionDivProps = React.ComponentProps<'div'> & MotionProps

const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionDivProps & React.RefAttributes<HTMLDivElement>
>

export default function HeritageLegacy(){
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto bg-transparent">
      <div className="max-w-6xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-display-lg font-display text-white mb-5">
            HERITAGE OF 911 GT3RS
          </h2>
          <MotionDiv className="h-1 w-40 gradient-accent" />
          <p className="mt-5 text-lg leading-8 text-muted-light max-w-2xl font-body">
            The 911 GT3 RS represents the apex of Porsche's racing DNA. Born from lap after lap at the Nürburgring,
            refined through countless hours of track testing, this is not a car—it's a statement of uncompromising
            performance, precision engineering, and the relentless pursuit of the perfect lap.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent my-12 origin-center"
        />

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: '911 Legacy', desc: 'An unbroken lineage since 1963. Rear-engine balance, relentless refinement, and performance perfected across generations.' },
            { title: 'RS Identity', desc: 'RS—Rennsport. Lightweight construction, maximum performance, and uncompromising focus. A badge reserved for Porsche’s most track-focused machines.' },
            { title: 'Nürburgring Heritage', desc: 'Developed and validated at the Nürburgring Nordschleife—the ultimate proving ground for performance engineering.' }
          ].map((item, i) => (
            <MotionDiv
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 transition-all"
            >
              <h3 className="text-accent-light font-display text-lg mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-muted-light text-sm leading-6 font-body">
                {item.desc}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
