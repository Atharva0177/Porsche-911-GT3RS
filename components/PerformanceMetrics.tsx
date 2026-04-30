"use client"
import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

type MotionDivProps = React.ComponentProps<'div'> & MotionProps
type MotionHeadingProps = React.ComponentProps<'h2'> & MotionProps

const MotionDiv = motion.div as unknown as React.ForwardRefExoticComponent<
  MotionDivProps & React.RefAttributes<HTMLDivElement>
>

const MotionH2 = motion.h2 as unknown as React.ForwardRefExoticComponent<
  MotionHeadingProps & React.RefAttributes<HTMLHeadingElement>
>

const metrics = [
  { label: 'Top Speed', value: '296', unit: 'km/h' },
  { label: 'Acceleration 0-100', value: '3.2', unit: 'sec' },
  { label: 'Lap Record', value: '6:49.328', unit: 'Nürburgring' },
  { label: 'Power Output', value: '525', unit: 'PS' },
  { label: 'Torque', value: '465', unit: 'Nm' },
  { label: 'Weight', value: '1,450', unit: 'kg' }
]

export default function PerformanceMetrics(){
  return (
    <section className="perf-section px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <MotionH2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-lg font-display text-white mb-10"
          >
          PERFORMANCE UNLEASHED
        </MotionH2>

        <MotionDiv className="mx-auto max-w-6xl" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="perf-canvas">
            {/* Top-left */}
            <MotionDiv className="perf-card perf-pos-top-left glass-card relative overflow-hidden" initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div>
                <div className="perf-card-value">{metrics[0].value}</div>
                <div className="perf-card-unit">{metrics[0].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[0].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/speed.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>

            {/* Top-center */}
            <MotionDiv className="perf-card perf-pos-top-center glass-card" initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.04 }}>
              <div>
                <div className="perf-card-value">{metrics[1].value}</div>
                <div className="perf-card-unit">{metrics[1].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[1].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/accel.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>

            {/* Top-right */}
            <MotionDiv className="perf-card perf-pos-top-right glass-card" initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 }}>
              <div>
                <div className="perf-card-value">{metrics[2].value}</div>
                <div className="perf-card-unit">{metrics[2].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[2].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/time.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>

            {/* Bottom-left */}
            <MotionDiv className="perf-card perf-pos-bottom-left glass-card" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}>
              <div>
                <div className="perf-card-value">{metrics[3].value}</div>
                <div className="perf-card-unit">{metrics[3].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[3].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/pwr.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>

            {/* Bottom-center */}
            <MotionDiv className="perf-card perf-pos-bottom-center glass-card" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div>
                <div className="perf-card-value">{metrics[4].value}</div>
                <div className="perf-card-unit">{metrics[4].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[4].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/torque.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>

            {/* Bottom-right */}
            <MotionDiv className="perf-card perf-pos-bottom-right glass-card" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}>
              <div>
                <div className="perf-card-value">{metrics[5].value}</div>
                <div className="perf-card-unit">{metrics[5].unit}</div>
              </div>
              <div className="perf-card-label">{metrics[5].label}</div>
              <div className="perf-card-image-slot" aria-hidden="true">
                <img src="/wt.png" alt="" className="perf-card-image" />
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
