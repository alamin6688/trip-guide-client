/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Search, Map, Filter, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { FilterModal } from "@/components/shared/FilterModal";

const categories = [
  "All",
  "Food & Drink",
  "Culture",
  "Adventure",
  "Nature",
  "Nightlife",
  "Photography",
];
const experiences = [
  {
    id: 1,
    title: "Hidden Jazz Bars of Tokyo",
    guide: "Kenji Tanaka",
    location: "Tokyo, Japan",
    rating: 4.9,
    reviews: 124,
    price: 85,
    image:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800",
    category: "Nightlife",
  },
  {
    id: 2,
    title: "Street Food Secrets",
    guide: "Maria Rodriguez",
    location: "Mexico City, Mexico",
    rating: 5.0,
    reviews: 89,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&q=80&w=800",
    category: "Food & Drink",
  },
  {
    id: 3,
    title: "Kyoto Temple Walk",
    guide: "Sakura Sato",
    location: "Kyoto, Japan",
    rating: 4.8,
    reviews: 215,
    price: 60,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    category: "Culture",
  },
  {
    id: 4,
    title: "Cappadocia Balloon Watch",
    guide: "Ahmet Yilmaz",
    location: "Cappadocia, Turkey",
    rating: 4.9,
    reviews: 342,
    price: 120,
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80&w=800",
    category: "Adventure",
  },
  {
    id: 5,
    title: "Marrakech Souk Discovery",
    guide: "Hassan Al-Fayed",
    location: "Marrakech, Morocco",
    rating: 4.7,
    reviews: 156,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800",
    category: "Culture",
  },
  {
    id: 6,
    title: "Northern Lights Hunt",
    guide: "Erik Olsen",
    location: "Tromsø, Norway",
    rating: 5.0,
    reviews: 98,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800",
    category: "Nature",
  },
];
export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#D4735E] selection:text-white font-['Outfit']">
      {/* <Navigation /> */}

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <main className="container mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl text-center font-bold text-[#3D2E2E] mb-6">
          Explore Experiences
        </h1>
        <div className="mb-12 text-center flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-sm border border-[#3D2E2E]/5 flex items-center w-full md:w-2/3 lg:w-3/4">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 px-4 py-2 outline-none text-[#3D2E2E] placeholder-gray-400"
            />
            <button className="bg-[#D4735E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b55b47] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-[#3D2E2E] text-white"
                    : "bg-white text-[#3D2E2E] border border-[#3D2E2E]/10 hover:border-[#3D2E2E]/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#3D2E2E]/10 rounded-full text-[#3D2E2E] font-medium hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#3D2E2E]/10 rounded-full text-[#3D2E2E] font-medium hover:bg-gray-50 transition-colors">
              <Map className="w-4 h-4" />
              Map View
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#3D2E2E]/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#3D2E2E] hover:text-[#D4735E] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3D2E2E]">
                  {exp.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#3D2E2E] group-hover:text-[#D4735E] transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-[#3D2E2E]">
                      {exp.rating}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({exp.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 mb-4 flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4735E]" />
                  {exp.location}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?u=${exp.guide}`}
                        alt={exp.guide}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-[#3D2E2E]">
                      By {exp.guide}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#D4735E]">
                      ${exp.price}
                    </span>
                    <span className="text-gray-400 text-sm">/person</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 border-2 border-[#3D2E2E] text-[#3D2E2E] rounded-full font-bold hover:bg-[#3D2E2E] hover:text-white transition-colors">
            Load More Experiences
          </button>
        </div>
      </main>
    </div>
  );
}
