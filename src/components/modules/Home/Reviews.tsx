/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
const testimonials = [
  {
    id: 1,
    traveler: {
      name: "Michael & Sarah",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400",
      location: "From Canada",
    },
    guide: {
      name: "Guide Marco",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    quote:
      "We felt like we were visiting an old friend. Marco showed us a side of Lisbon we never would have found on our own. The dinner at his grandmother's restaurant was the highlight of our trip!",
    location: "Lisbon, Portugal",
  },
  {
    id: 2,
    traveler: {
      name: "Jessica Wu",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
      location: "From USA",
    },
    guide: {
      name: "Guide Yuki",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    },
    quote:
      "I was nervous traveling solo, but Yuki made me feel so safe and welcome. Her knowledge of the local art scene is incredible. I left with a new perspective and a new friend.",
    location: "Tokyo, Japan",
  },
];
export function Reviews() {
  return (
    <section className="py-24 bg-[#8B9D83]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E] mb-4">
            Real Connections
          </h2>
          <p className="text-lg text-[#3D2E2E]/70 max-w-2xl mx-auto">
            Travel isn't just about places, it's about the people you meet along
            the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
              }}
              className="bg-white rounded-4xl p-8 md:p-10 shadow-xl relative overflow-hidden"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#D4735E]/10" />

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex -space-x-4">
                  <img
                    src={item.traveler.image}
                    alt={item.traveler.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                  <img
                    src={item.guide.image}
                    alt={item.guide.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#3D2E2E]">
                    {item.traveler.name}
                  </p>
                  <p className="text-sm text-[#3D2E2E]/60">
                    with {item.guide.name} in {item.location}
                  </p>
                </div>
              </div>

              <p className="text-xl text-[#3D2E2E]/80 italic leading-relaxed mb-6">
                {item.quote}
              </p>

              <div className="flex items-center text-[#D4735E] font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-[#D4735E] mr-2" />
                Verified Experience
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
