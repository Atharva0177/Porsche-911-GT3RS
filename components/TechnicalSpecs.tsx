"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

type MotionDivProps = React.ComponentProps<'div'> & MotionProps

const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionDivProps & React.RefAttributes<HTMLDivElement>
>

const specs = [
  {
    category: 'Engine',
    items: [
      { name: 'Type', value: 'Flat-6, Air-cooled' },
      { name: 'Displacement', value: '3,995 cc' },
      { name: 'Redline', value: '9,000 RPM' },
      { name: 'Power', value: '525 PS @ 8,400 rpm' }
    ]
  },
  {
    category: 'Transmission',
    items: [
      { name: 'Type', value: '7-speed PDK' },
      { name: '0-100 km/h', value: '3.2 seconds' },
      { name: 'Top Speed', value: '345+ km/h' },
      { name: 'Efficiency', value: 'E-LAG Technology' }
    ]
  },
  {
    category: 'Chassis',
    items: [
      { name: 'Suspension', value: 'Double-wishbone (front/rear)' },
      { name: 'Brakes', value: 'PCCB, 370mm front' },
      { name: 'Tires', value: 'Michelin Pilot Sport 10' },
      { name: 'Track Use', value: 'Certified for racing' }
    ]
  }
]

export default function TechnicalSpecs(){
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-display-lg font-display text-white mb-4">TECHNICAL SPECIFICATIONS</h2>
          <div className="h-1 w-32 gradient-accent" />
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specs.map((spec, idx) => (
            <MotionDiv
              key={spec.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="glass-card p-8 rounded-xl hover:bg-white/6 transition-colors"
            >
              <h3 className="text-accent text-2xl md:text-3xl font-display tracking-wider mb-6">
                {spec.category}
              </h3>

              <div className="space-y-4">
                {spec.items.map((item, i) => (
                  <MotionDiv
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.12 + i * 0.05 }}
                    className="flex items-start justify-between pb-3 border-b border-white/5"
                  >
                    <span className="text-muted-light text-sm font-body spec-item-name">
                      {item.name}
                    </span>
                    <span className="text-white font-body text-right ml-4 spec-item-value">
                      {item.value}
                    </span>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
