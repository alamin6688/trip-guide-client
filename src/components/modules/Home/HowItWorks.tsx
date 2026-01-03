"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, MessageCircle, Map } from 'lucide-react'
const steps = [
  {
    icon: UserPlus,
    title: 'Find Your Perfect Guide',
    description:
      'Browse profiles of verified locals who share your interests and speak your language.',
    color: 'bg-[#D4735E]',
  },
  {
    icon: MessageCircle,
    title: 'Connect & Plan',
    description:
      'Chat directly with your guide to customize your itinerary and get local tips before you arrive.',
    color: 'bg-[#8B9D83]',
  },
  {
    icon: Map,
    title: 'Explore Like a Local',
    description:
      "Meet up and discover the city's best-kept secrets, away from the tourist traps.",
    color: 'bg-[#E8B4A2]',
  },
]
export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="text-[#D4735E] font-semibold tracking-wider uppercase text-sm"
          >
            Simple & Secure
          </motion.span>
          <motion.h2
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="text-4xl md:text-5xl font-bold text-[#3D2E2E] mt-3 mb-6"
          >
            How LocalEyes Works
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="text-lg text-[#3D2E2E]/70 max-w-2xl mx-auto"
          >
            We make it easy to connect with friendly locals who can show you the
            real side of their city.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#F5EFE6] -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
              }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg mb-8 relative group`}
              >
                <step.icon className="w-10 h-10 transform transition-transform group-hover:scale-110 duration-300" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#3D2E2E] mb-4">
                {step.title}
              </h3>
              <p className="text-[#3D2E2E]/70 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
