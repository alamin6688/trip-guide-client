import { useState } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  duration?: string[];
  languages?: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}
export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const durations = ["< 2 hours", "2-4 hours", "Half Day", "Full Day"];
  const languages = ["English", "Spanish", "French", "Japanese", "Italian"];
  const toggleDuration = (duration: string) => {
    if (selectedDuration.includes(duration)) {
      setSelectedDuration(selectedDuration.filter((d) => d !== duration));
    } else {
      setSelectedDuration([...selectedDuration, duration]);
    }
  };
  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-[#F5EFE6] rounded-3xl shadow-2xl p-0 font-['Outfit']"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#F5EFE6]/95 backdrop-blur-md px-6 py-4 border-b border-[#3D2E2E]/10 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-[#3D2E2E]">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#3D2E2E]/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#3D2E2E]" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Price Range */}
              <section>
                <h3 className="text-lg font-bold text-[#3D2E2E] mb-4">
                  Price Range
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-[#3D2E2E]/10 rounded-lg appearance-none cursor-pointer accent-[#D4735E]"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </section>

              {/* Rating */}
              <section>
                <h3 className="text-lg font-bold text-[#3D2E2E] mb-4">
                  Guest Rating
                </h3>
                <div className="flex gap-3">
                  {[5, 4, 3].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-all ${
                        selectedRating === rating
                          ? "bg-[#3D2E2E] text-white border-[#3D2E2E]"
                          : "bg-white text-[#3D2E2E] border-[#3D2E2E]/10 hover:border-[#3D2E2E]/30"
                      }`}
                    >
                      <span>{rating}+</span>
                      <svg
                        className={`w-4 h-4 ${
                          selectedRating === rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-yellow-500"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </section>

              {/* Duration */}
              <section>
                <h3 className="text-lg font-bold text-[#3D2E2E] mb-4">
                  Duration
                </h3>
                <div className="flex flex-wrap gap-3">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => toggleDuration(duration)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedDuration.includes(duration)
                          ? "bg-[#3D2E2E] text-white border-[#3D2E2E]"
                          : "bg-white text-[#3D2E2E] border-[#3D2E2E]/10 hover:border-[#3D2E2E]/30"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </section>

              {/* Language */}
              <section>
                <h3 className="text-lg font-bold text-[#3D2E2E] mb-4">
                  Guide Language
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          selectedLanguages.includes(lang)
                            ? "bg-[#D4735E] border-[#D4735E]"
                            : "border-gray-300 group-hover:border-[#D4735E]"
                        }`}
                        onClick={() => toggleLanguage(lang)}
                      >
                        {selectedLanguages.includes(lang) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span className="text-[#3D2E2E]">{lang}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#F5EFE6] px-6 py-4 border-t border-[#3D2E2E]/10 flex gap-4">
              <button
                onClick={() => {
                  setPriceRange([0, 500]);
                  setSelectedRating(null);
                  setSelectedDuration([]);
                  setSelectedLanguages([]);
                }}
                className="flex-1 px-6 py-3 rounded-full font-bold text-[#3D2E2E] hover:bg-[#3D2E2E]/5 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-2 px-6 py-3 rounded-full font-bold text-white bg-[#D4735E] hover:bg-[#b55b47] transition-colors shadow-lg shadow-[#D4735E]/20"
              >
                Show 124 Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
