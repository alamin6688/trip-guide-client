"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import {
  DollarSign,
  Clock,
  Heart,
  Users,
  UserPlus,
  CheckCircle,
  TrendingUp,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description:
      "Set your own rates and earn up to $50/hour sharing your local knowledge.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Guide when it works for you - weekends, evenings, or full-time.",
  },
  {
    icon: Heart,
    title: "Share Your Passion",
    description: "Show travelers the hidden gems and stories only locals know.",
  },
  {
    icon: Users,
    title: "Meet Amazing People",
    description: "Connect with curious travelers from around the world.",
  },
];
const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your profile in 10 minutes. Tell us about yourself and your city.",
  },
  {
    icon: CheckCircle,
    title: "Get Verified",
    description:
      "We'll verify your identity and local expertise to ensure quality.",
  },
  {
    icon: TrendingUp,
    title: "Start Earning",
    description:
      "Accept bookings, guide travelers, and get paid directly to your bank.",
  },
];
const testimonials = [
  {
    name: "Kenji",
    city: "Tokyo",
    role: "Guide for 2 years",
    tours: "450+ tours",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    quote:
      "Being a guide lets me share my love for Tokyo while earning a great income. I've met incredible people and it never feels like work.",
  },
  {
    name: "Sofia",
    city: "Lisbon",
    role: "Guide for 1 year",
    tours: "200+ tours",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    quote:
      "The flexibility is amazing. I can work around my university schedule and make more than I would at a regular part-time job.",
  },
  {
    name: "Marcus",
    city: "Berlin",
    role: "Guide for 3 years",
    tours: "800+ tours",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    quote:
      "I started doing this on weekends, but now it's my full-time career. I love showing people the real Berlin beyond the tourist traps.",
  },
];
const requirements = [
  "18 years or older",
  "Deep knowledge of your city",
  "Fluent in English (additional languages a plus)",
  "Smartphone for bookings",
  "Passion for hospitality",
  "Valid ID for verification",
];
const faqs = [
  {
    question: "How much can I earn?",
    answer:
      "Most guides earn between $25-$50 per hour. Top guides who offer unique experiences can earn significantly more. You set your own prices.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments are processed securely and deposited directly into your bank account weekly. You keep 85% of your tour price.",
  },
  {
    question: "What if I need to cancel a tour?",
    answer:
      "We understand emergencies happen. You can cancel up to 24 hours in advance without penalty. Frequent cancellations may affect your rating.",
  },
  {
    question: "Do I need insurance?",
    answer:
      "We provide basic liability coverage for all verified guides during active tours. However, we recommend having your own health insurance.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Typically 2-3 business days. We review your profile, verify your ID, and may schedule a short video call.",
  },
];
export default function BecomeAGuidePage() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#D4735E] selection:text-white font-['Outfit']">
      {/* <Navigation /> */}

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=2000"
              alt="Guide showing tourists around"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Turn Your City Into <br />
              <span className="text-[#D4735E]">Your Career</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200"
            >
              Share your passion, earn on your schedule, and connect travelers
              with authentic local experiences.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-[#D4735E] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b55b47] transition-all transform hover:scale-105 shadow-lg">
                Start Your Journey
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 py-6">
            <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white">
              <div className="text-center">
                <p className="text-2xl font-bold">2,500+</p>
                <p className="text-sm text-gray-300">Active Guides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">$2,400</p>
                <p className="text-sm text-gray-300">Avg Monthly Earnings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-gray-300">Flexible Hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#D4735E] font-bold tracking-wider uppercase text-sm mb-2 block">
                Why Join Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E]">
                Why Become a Guide?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
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
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="bg-[#F5EFE6] p-8 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-[#D4735E]/10 rounded-full flex items-center justify-center mb-6 text-[#D4735E]">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3D2E2E] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 bg-[#F5EFE6]">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E]">
                Start Guiding in 3 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#D4735E]/20 z-0" />

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
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.2,
                  }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-[#D4735E] border-4 border-[#F5EFE6]">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm w-full h-full">
                    <span className="text-[#D4735E] font-bold text-lg mb-2 block">
                      Step {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-[#3D2E2E] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button className="bg-[#D4735E] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#b55b47] transition-all shadow-lg inline-flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Earnings Potential */}
        <section className="py-24 px-4 bg-linear-to-br from-[#3D2E2E] to-[#2a2020] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4735E] rounded-full filter blur-[120px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4735E] rounded-full filter blur-[120px] opacity-10" />

          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Earning Potential
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Turn your free time into serious income. Whether you want to
                  guide occasionally or make it a full-time career, the
                  potential is in your hands.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4735E]/20 rounded-full flex items-center justify-center text-[#D4735E]">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Set Your Own Rates</p>
                      <p className="text-gray-400">
                        You decide how much your time is worth.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4735E]/20 rounded-full flex items-center justify-center text-[#D4735E]">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Group Size Control</p>
                      <p className="text-gray-400">
                        Host private tours or large groups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Monthly Earnings Estimator
                </h3>

                <div className="space-y-8 mb-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Tour Price</span>
                      <span className="font-bold">$45 / person</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-[#D4735E]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Group Size</span>
                      <span className="font-bold">4 people</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-[#D4735E]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Tours Per Week</span>
                      <span className="font-bold">8 tours</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[30%] bg-[#D4735E]" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <p className="text-gray-300 mb-2">
                    Potential Monthly Earnings
                  </p>
                  <p className="text-5xl font-bold text-[#D4735E]">$5,760</p>
                  <p className="text-sm text-gray-400 mt-2">
                    *Based on averages. Top guides earn even more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E]">
                Stories from Our Guides
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
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
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="bg-[#F5EFE6] p-8 rounded-2xl relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4735E]"
                    />
                    <div>
                      <h4 className="font-bold text-[#3D2E2E] text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#D4735E] text-sm font-medium">
                        {testimonial.city}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role} • {testimonial.tours}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 px-4 bg-[#F5EFE6]">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D2E2E] mb-4">
                What You'll Need
              </h2>
              <p className="text-gray-600">
                Don't worry - we'll help you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[#D4735E]/10 rounded-full flex items-center justify-center text-[#D4735E] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#3D2E2E] font-medium">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E]">
                Common Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-6">
                  <h3 className="text-xl font-bold text-[#3D2E2E] mb-2 flex justify-between items-center cursor-pointer">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-[#3D2E2E] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of locals earning by sharing their cities.
            </p>
            <div className="flex flex-col items-center gap-4">
              <button className="bg-[#D4735E] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#b55b47] transition-all transform hover:scale-105 shadow-xl">
                Apply to Become a Guide
              </button>
              <p className="text-gray-400 text-sm">
                Takes less than 10 minutes
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
