/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Globe, Heart } from "lucide-react";

const topGuides = [
  {
    id: 1,
    name: "Elena Rossi",
    location: "Rome, Italy",
    rating: 4.98,
    reviews: 124,
    languages: ["English", "Italian", "French"],
    bio: "Art historian by day, food lover by night. I'll show you the Rome that isn't in the guidebooks, from hidden Renaissance courtyards to the best carbonara in Trastevere.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    tags: ["History", "Food & Drink", "Art"],
  },
  {
    id: 2,
    name: "Kenji Tanaka",
    location: "Kyoto, Japan",
    rating: 5.0,
    reviews: 89,
    languages: ["English", "Japanese"],
    bio: "Born and raised in Gion. My family has lived here for generations. Let's explore ancient temples at dawn and discover quiet tea houses where time stands still.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    tags: ["Culture", "Photography", "Nature"],
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    location: "Cape Town, SA",
    rating: 4.95,
    reviews: 156,
    languages: ["English", "Afrikaans"],
    bio: "Professional photographer and hiking enthusiast. I specialize in sunrise treks up Lion's Head and street art tours in Woodstock. Bring your camera!",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800",
    tags: ["Adventure", "Photography", "Outdoors"],
  },
];

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function TopRatedGuides() {
  return (
    <section className="py-24 bg-[#F5EFE6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E] mb-4">
              Meet Our Top Guides
            </h2>
            <p className="text-lg text-[#3D2E2E]/70 max-w-2xl">
              Highly rated locals who go above and beyond to create
              unforgettable memories.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:block text-[#D4735E] font-bold hover:text-[#b55b47] transition-colors pb-2 border-b-2 border-[#D4735E]"
          >
            View all guides
          </a>
        </div>

        <div className="space-y-8">
          {topGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-[#3D2E2E]/5 hover:shadow-2xl hover:shadow-[#D4735E]/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                  <div className="relative aspect-4/5 md:aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-bold text-[#3D2E2E] text-sm">
                        {guide.rating}
                      </span>
                      <span className="text-[#3D2E2E]/50 text-xs ml-1">
                        ({guide.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#3D2E2E] mb-1">
                        {guide.name}
                      </h3>
                      <p className="text-[#D4735E] font-medium flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {guide.location}
                      </p>
                    </div>
                    <button className="text-[#3D2E2E]/30 hover:text-[#D4735E] transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-[#3D2E2E]/80 text-lg leading-relaxed mb-6 italic">
                    {guide.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#F5EFE6] text-[#3D2E2E]/70 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#F5EFE6]">
                    <div className="flex items-center text-[#3D2E2E]/60 text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Speaks: {guide.languages.join(", ")}
                    </div>
                    <button className="bg-[#3D2E2E] hover:bg-[#D4735E] text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact {guide.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#"
            className="text-[#D4735E] font-bold hover:text-[#b55b47] transition-colors pb-1 border-b-2 border-[#D4735E]"
          >
            View all guides
          </a>
        </div>
      </div>
    </section>
  );
}
