"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

const cards = [
  { title: 'Weissach Package', subtitle: 'Weight savings breakthrough', desc: 'Carbon ceramic brakes, lightweight wheels, optimized aerodynamics.' },
  { title: 'Aerodynamics', subtitle: 'Peak downforce design', desc: 'Fixed rear wing, aggressive splitters, optimized for track performance.' },
  { title: 'Powertrain', subtitle: 'Racing precision', desc: '525 PS flat-six, 7-speed PDK, Weissach axle engineering.' },
  { title: 'Track Record', subtitle: 'Nürburgring legend', desc: '6:49.328 Nordschleife. The reference for road-legal supercars.' }
]

type MotionCardProps = React.ComponentProps<'div'> & MotionProps

const MotionCard = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionCardProps & React.RefAttributes<HTMLDivElement>
>

const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionCardProps & React.RefAttributes<HTMLDivElement>
>

export default function ModelVariants(){
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-display-lg font-display text-white mb-3">FOUR DIMENSIONS OF PERFECTION</h2>
        <MotionDiv className="h-1 w-40 gradient-accent" />
      </MotionDiv>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => {
          const values = ['-35', '409', '9,000', '6:49:328']
          const units = ['kg', 'kg', 'RPM']
          return (
            <MotionCard
              whileHover={{ y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i*0.08 }}
              key={c.title}
              className="spec-card transition-all"
            >
              <div className="flex items-start">
                <div>
                  <div className="card-kicker text-xs text-muted-light">0{i+1}</div>
                  <h4 className="card-title font-display tracking-wider">{c.title}</h4>
                  <div className="card-sub">{c.subtitle}</div>
                </div>
              </div>

              <div className="mt-4 text-muted-light text-sm leading-6 font-body">{c.desc}</div>

              <div className="mt-6 flex items-end">
                <div className="spec-value">{values[i]}<span className="spec-unit">{units[i]}</span></div>
              </div>
            </MotionCard>
          )
        })}
      </div>
    </section>
  )
}
