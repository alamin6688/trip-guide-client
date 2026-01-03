"use client"
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

// import { Navigation } from '../components/Navigation'
// import { Footer } from '../components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, User } from 'lucide-react'
const stories = [
  {
    id: 1,
    title: 'Why I Left My Corporate Job to Become a Guide in Lisbon',
    excerpt:
      'The cobblestone streets called to me in a way the boardroom never did. Here is how I found my passion sharing the history of my city.',
    author: 'Sofia Silva',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1590634331662-6609b9e4a327?auto=format&fit=crop&q=80&w=800',
    category: 'Guide Stories',
  },
  {
    id: 2,
    title: 'A Culinary Journey Through the Night Markets of Taipei',
    excerpt:
      'Beyond the stinky tofu and bubble tea lies a complex web of flavors, history, and family recipes passed down for generations.',
    author: 'James Chen',
    date: 'Sep 28, 2023',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
    category: 'Food & Culture',
  },
  {
    id: 3,
    title: 'Finding Silence in the Bustle of Mumbai',
    excerpt:
      "Local guide Priya shows us the hidden temples and quiet gardens that offer sanctuary in one of the world's busiest cities.",
    author: 'Sarah Jenkins',
    date: 'Nov 03, 2023',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800',
    category: 'Traveler Tales',
  },
  {
    id: 4,
    title: 'The Art of Coffee Culture in Melbourne',
    excerpt:
      "It's not just caffeine; it's a religion. Exploring the laneways and roasteries that define Melbourne's soul.",
    author: 'Jack Thompson',
    date: 'Oct 21, 2023',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1524350876685-27f5d14cc74a?auto=format&fit=crop&q=80&w=800',
    category: 'Food & Culture',
  },
]
export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#D4735E] selection:text-white font-['Outfit']">
      {/* <Navigation /> */}

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4735E] font-bold tracking-wider uppercase text-sm mb-4 block">
              The LocalEyes Journal
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-[#3D2E2E] mb-6 leading-tight">
              Stories from the{' '}
              <span className="italic text-[#D4735E]">Road</span> Less Traveled
            </h1>
            <p className="text-xl text-gray-600">
              Discover the people, places, and hidden gems that make travel
              transformative.
            </p>
          </div>

          {/* Featured Story */}
          <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-21/9 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600"
              alt="Featured Story"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
              <span className="bg-[#D4735E] text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                Featured
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Crossing the Andes: A Guide's Perspective on Resilience
              </h2>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Mateo Rivera</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {stories.map((story, index) => (
              <motion.article
                key={story.id}
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
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden mb-6 aspect-3/2">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-[#D4735E] font-bold mb-3">
                  <span>{story.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-gray-500 font-normal">
                    {story.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#3D2E2E] mb-3 group-hover:text-[#D4735E] transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#3D2E2E] border-b border-[#3D2E2E]/20 pb-0.5">
                    By {story.author}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 bg-[#3D2E2E] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Have a story to tell?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
                We are always looking for authentic travel experiences and local
                perspectives. Share your journey with our community.
              </p>
              <button className="bg-[#D4735E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b55b47] transition-colors inline-flex items-center gap-2">
                Submit Your Story
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
