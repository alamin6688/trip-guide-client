/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FilterModal, FilterValues } from "@/components/shared/FilterModal";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, CircleX, ListChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { postBooking } from "@/services/tourist/touristsManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { toast } from "sonner";

// const imgUrl = "https://i.ibb.co/YttkYVj/clay-banks-kiv1ggvkg-Qk-unsplash.jpg";
// const FALLBACK_IMAGE =
//   "https://i.ibb.co/4g3S98Fy/1-7-KCp-GW9-D2r-Il-NV2-Jh-Fsp-Q.png";

interface ExploreProps {
  initialListings: any[];
  initialFilters: Record<string, string | undefined>;
  allCategories: any[];
}

export default function Explore({
  initialListings,
  initialFilters,
  allCategories,
}: ExploreProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<any[]>(initialListings);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || "");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    date: "",
  });
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setExperiences(initialListings);
  }, [initialListings]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();
      setUser(user); // set a local state
    };
    fetchUser();
  }, []);

  // Initialize state from URL params
  useEffect(() => {
    if (initialFilters) {
      setSearchTerm(initialFilters.search || "");
      setSelectedCategory(initialFilters.category || null);
      setAppliedFilters({
        date: initialFilters.date || "",
        minPrice: initialFilters.minPrice ? Number(initialFilters.minPrice) : undefined,
        maxPrice: initialFilters.maxPrice ? Number(initialFilters.maxPrice) : undefined,
        rating: initialFilters.rating ? Number(initialFilters.rating) : undefined,
        duration: initialFilters.duration ? initialFilters.duration.split(",") : [],
        languages: initialFilters.languages ? initialFilters.languages.split(",") : [],
      });
    }
  }, [initialFilters]);

  // Use categories from prop instead of deriving from filtered listings
  const categories = allCategories.map((cat) => cat.title).filter(Boolean);

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    });
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  }

  const handleApplyFilters = (filters: FilterValues) => {
    // Save filters to state
    setAppliedFilters(filters);

    // Update URL query params
    const params = new URLSearchParams(window.location.search);

    if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
    else params.delete("minPrice");

    if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
    else params.delete("maxPrice");

    if (filters.rating !== undefined) params.set("rating", String(filters.rating));
    else params.delete("rating");

    if (filters.duration?.length) params.set("duration", filters.duration.join(","));
    else params.delete("duration");

    if (filters.languages?.length) params.set("languages", filters.languages.join(","));
    else params.delete("languages");

    if (filters.date) params.set("date", filters.date);
    else params.delete("date");

    router.push(`?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const clearAllFilters = () => {
    // Reset local state
    setSelectedCategory(null);
    setSearchTerm("");
    setAppliedFilters({
      date: "",
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      duration: [],
      languages: [],
    });

    // Reset URL query params
    router.push("?");
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#D4735E] selection:text-white font-['Outfit']">
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialValues={appliedFilters}
      />

      <div className="container mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-center font-bold text-[#3D2E2E] mb-6">
          Explore Experiences
        </h1>

        {/* Search Bar */}
        <div className="mb-12 text-center flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-white p-2 rounded-full shadow-sm border border-[#3D2E2E]/5 flex items-center w-full md:w-2/3 lg:w-3/4">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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

        {/* Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {["All", ...categories].map((category) => (
              <button
                key={category as string}
                onClick={() =>
                  handleCategoryChange(category === "All" ? null : category as string)
                }
                className={`px-4 py-2 rounded-full hover:bg-[#faa28f] hover:text-black hover:border-none text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category ||
                  (category === "All" && selectedCategory === null)
                  ? "bg-[#D4735E] text-white"
                  : "bg-white text-[#3D2E2E] border border-[#3D2E2E]/10 hover:border-[#3D2E2E]/30"
                  }`}
              >
                {category as string || "Unknown"}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-[#3D2E2E]/10 bg-gray-50 hover:bg-[#D4735E]/10 transition-colors"
            >
              <span className="flex items-center justify-center gap-1 text-xl">
                <CircleX className="" /> Clear All
              </span>
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="bg-[#D4735E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b55b47] transition-colors"
            >
              <span className="flex items-center justify-center gap-2 text-xl">
                <ListChevronsUpDown className="" /> More Filters
              </span>
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#3D2E2E]/5"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={exp.images}
                  alt={exp.title}
                  fill
                  unoptimized
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
                {/* <p className="text-gray-500 mb-4 text-sm">Date: {exp.date}</p> */}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-200 relative h-8 w-8 overflow-hidden">
                      <Image
                        src={exp.guide.profilePhoto}
                        alt="guide"
                        fill
                        // unoptimized
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
                  {/* <div>
                    <span className="text-yellow-400 font-medium"></span>
                    {"★".repeat(Math.floor(exp.rating))}
                  </div> */}
                </div>
                <button
                  onClick={() => {
                    setSelectedListing(exp);
                    setIsBookingModalOpen(true);
                  }}
                  className="mt-4 w-full bg-[#D4735E] text-white py-2 rounded-full font-medium hover:bg-[#b55b47] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {experiences.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No results found
          </p>
        )}

        <AnimatePresence>
          {isBookingModalOpen && selectedListing && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setStartDate(null);
                    setEndDate(null);
                  }}
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold text-[#3D2E2E] mb-2">
                  {selectedListing.title}
                </h2>
                <p className="text-gray-500 mb-4">{selectedListing.city}</p>

                <div className="mb-4">
                  <span className="font-semibold">Guide:</span>{" "}
                  {selectedListing.guide?.name || "Unknown"}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Price:</span> $
                  {selectedListing.price}/person
                </div>

                {/* Date Inputs */}
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Start Date:</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate || ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-1">End Date:</label>
                  <input
                    type="date"
                    min={startDate || new Date().toISOString().split("T")[0]}
                    value={endDate || ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                {/* Send Request Button */}
                <button
                  disabled={!startDate || isBookingLoading}
                  onClick={async () => {
                    if (!startDate) return;

                    setIsBookingLoading(true); // start loading immediately

                    try {
                      // 1️⃣ Check user
                      const userInfo = await getUserInfo();

                      if (!userInfo || !userInfo.touristId) {
                        toast.error("Only logged-in tourists can make bookings!");
                        const currentPath =
                          window.location.pathname + window.location.search;
                        router.push(
                          `/login?redirect=${encodeURIComponent(currentPath)}`
                        );
                        return;
                      }

                      // Now it's safe to call postBooking
                      const result = await postBooking({
                        listingId: selectedListing.id,
                        startDate,
                        endDate: endDate,
                        user: userInfo,
                      });

                      if (!result.success) throw new Error(result.message);

                      // 3️⃣ Success feedback
                      toast.success("Booking request sent! Status: Pending");

                      // Reset modal state
                      setIsBookingModalOpen(false);
                      setStartDate(null);
                      setEndDate(null);
                      router.push("/dashboard/my-bookings");
                    } catch (err: any) {
                      toast.error(err.message || "Something went wrong");
                    } finally {
                      setIsBookingLoading(false);
                    }
                  }}
                  className="w-full bg-[#D4735E] text-white py-2 rounded-full font-medium hover:bg-[#b55b47] transition-colors disabled:opacity-50"
                >
                  {isBookingLoading ? "Sending..." : "Send Request"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
