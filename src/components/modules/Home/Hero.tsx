"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Search } from "lucide-react";
const guides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800",
    alt: "Smiling guide in Italy",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    alt: "Guide in Kyoto",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    alt: "Guide in Morocco",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    alt: "Guide in New York",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    alt: "Guide in Paris",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800",
    alt: "Guide in London",
  },
];

function MosaicCard({
  guide,
  delay,
  height,
}: {
  guide: any;
  delay: number;
  height: string;
}) {
  return (
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
        duration: 0.6,
        delay,
      }}
      className={`relative overflow-hidden rounded-2xl ${height} group cursor-pointer`}
    >
      <img
        src={guide.img}
        alt={guide.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#3D2E2E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-36 pb-36 overflow-hidden bg-[#F5EFE6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="z-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#3D2E2E] leading-[1.1] mb-6">
              Discover Your City Through{" "}
              <span className="text-[#D4735E]">Trip Guide</span>
            </h1>
            <p className="text-xl text-[#3D2E2E]/80 mb-8 max-w-lg leading-relaxed">
              Connect with passionate guides who share authentic experiences,
              hidden gems, and the stories that make their cities come alive.
            </p>

            <div className="bg-white p-2 rounded-full shadow-xl shadow-[#D4735E]/10 flex items-center max-w-md border border-[#D4735E]/10">
              <div className="pl-4 text-[#3D2E2E]/40">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 px-4 py-3 bg-transparent outline-none text-[#3D2E2E] placeholder:text-[#3D2E2E]/40"
              />
              <button className="bg-[#D4735E] hover:bg-[#b55b47] text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105">
                Search
              </button>
            </div>

            <div className="mt-8 flex items-center space-x-4 text-sm font-medium text-[#3D2E2E]/60">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#8B9D83] border-2 border-[#F5EFE6]"
                  />
                ))}
              </div>
              <span>Trusted by 50,000+ travelers worldwide</span>
            </div>
          </motion.div>

          {/* Mosaic Grid */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="space-y-4 pt-12">
                <MosaicCard guide={guides[0]} delay={0.2} height="h-64" />
                <MosaicCard guide={guides[1]} delay={0.3} height="h-48" />
              </div>
              <div className="space-y-4">
                <MosaicCard guide={guides[2]} delay={0.4} height="h-48" />
                <MosaicCard guide={guides[3]} delay={0.5} height="h-72" />
                <MosaicCard guide={guides[4]} delay={0.6} height="h-48" />
              </div>
              <div className="space-y-4 pt-20">
                <MosaicCard guide={guides[5]} delay={0.7} height="h-56" />
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
                    duration: 0.6,
                    delay: 0.8,
                  }}
                  className="bg-[#8B9D83] rounded-2xl h-40 flex items-center justify-center text-white p-6 text-center"
                >
                  <span className="font-['Outfit'] font-bold text-xl">
                    Join 2,000+ Guides
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#D4735E]/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

