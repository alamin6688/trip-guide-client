/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FilterModal, FilterValues } from "@/components/shared/FilterModal";
import { motion } from "framer-motion";
import { Search, Heart } from "lucide-react";
import Image from "next/image";

interface ExploreProps {
  initialListings: any[];
  initialFilters: Record<string, string | undefined>;
}

export default function Explore({
  initialListings,
  initialFilters,
}: ExploreProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<any[]>(initialListings);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || "");

  useEffect(() => {
    setExperiences(initialListings);
  }, [initialListings]);

  const filteredExperiences = selectedCategory
    ? experiences.filter((exp) => exp.categories?.title === selectedCategory)
    : experiences;

  // Unique categories from initial listings
  const categories = Array.from(
    new Set(initialListings.map((exp) => exp.categories?.title))
  );

  const handleSearch = () => {
    startTransition(() => {
      console.log("Clicked");
      // create URLSearchParams from current filters
      const params = new URLSearchParams();

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    });
  };

  const handleApplyFilters = (filters: FilterValues) => {
    startTransition(() => {
      const params = new URLSearchParams();

      if (filters.minPrice !== undefined)
        params.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice !== undefined)
        params.set("maxPrice", String(filters.maxPrice));
      if (filters.rating !== undefined)
        params.set("rating", String(filters.rating));
      if (filters.duration?.length)
        params.set("duration", filters.duration.join(","));
      if (filters.languages?.length)
        params.set("languages", filters.languages.join(","));

      router.push(`?${params.toString()}`);
    });

    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#D4735E] selection:text-white font-['Outfit']">
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      <div className="container mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-center font-bold text-[#3D2E2E] mb-6">
          Explore Experiences
        </h1>

        <div className="mb-12 text-center flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-white p-2 rounded-full shadow-sm border border-[#3D2E2E]/5 flex items-center w-full md:w-2/3 lg:w-3/4">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 outline-none text-[#3D2E2E] placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="bg-[#D4735E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b55b47] transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {[
              "All",
              ...Array.from(
                new Set(initialListings.map((exp) => exp.categories?.title))
              ),
            ].map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "All" ? null : category)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category ||
                  (category === "All" && selectedCategory === null)
                    ? "bg-[#3D2E2E] text-white"
                    : "bg-white text-[#3D2E2E] border border-[#3D2E2E]/10 hover:border-[#3D2E2E]/30"
                }`}
              >
                {category || "Unknown"}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#3D2E2E]/5"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={exp.images?.[0]}
                  alt={exp.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#3D2E2E] hover:text-[#D4735E] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3D2E2E]">
                  {exp.categories?.title || "Unknown"}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3D2E2E] group-hover:text-[#D4735E] transition-colors mb-2">
                  {exp.title}
                </h3>
                <p className="text-gray-500 mb-4 text-sm">{exp.city}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={exp.guide?.profilePhoto}
                        alt="guide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-[#3D2E2E]">
                      {exp.guide?.name || "Unknown"}
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

        {experiences.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No results found
          </p>
        )}
      </div>
    </div>
    // </div>
  );
}
