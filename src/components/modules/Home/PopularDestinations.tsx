/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
const destinations = [
  {
    city: "Barcelona",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800",
    guideImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    quote: "The Gothic Quarter at sunset is pure magic.",
  },
  {
    city: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    guideImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    quote: "Bamboo forests whisper ancient secrets here.",
  },
  {
    city: "Marrakech",
    country: "Morocco",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=800",
    guideImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    quote: "The colors of the souk will change your life.",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80&w=800",
    guideImage:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200",
    quote: "Street food here is an art form.",
  },
];
export function PopularDestinations() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3D2E2E] mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-[#3D2E2E]/70">
            See the world through the eyes of those who call it home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.city}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Main Image */}
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linearr-to-t from-[#3D2E2E]/90 via-[#3D2E2E]/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {dest.city}
                    </h3>
                    <p className="text-white/80">{dest.country}</p>
                  </div>
                </div>

                {/* Guide Perspective */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center space-x-3 border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src={dest.guideImage}
                    alt="Local guide"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <p className="text-white/90 text-xs italic leading-tight line-clamp-2">
                    "{dest.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
