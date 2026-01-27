"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/hooks/useAuth";

export function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore-tours", label: "Explore Tours" },
    { href: "/stories", label: "Stories" },
    { href: "/become-a-guide", label: "Become a Guide" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#F5EFE6]/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-[#D4735E] p-2 rounded-lg text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="w-5 h-5" />
              </motion.div>
              <span className="text-2xl font-bold text-[#3D2E2E]">
                TripGuide
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-[#3D2E2E] hover:text-[#D4735E] font-medium transition-colors relative group"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4735E] group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}

            {/* Dashboard – only when logged in with animation */}
            <AnimatePresence mode="wait">
              {!isLoading && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href="/dashboard"
                    className="text-[#3D2E2E] hover:text-[#D4735E] font-medium transition-colors relative group"
                  >
                    Dashboard
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4735E] group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Auth Button with smooth transition */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"
                />
              ) : isAuthenticated ? (
                <motion.div
                  key="logout"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogoutButton onLogout={logout} />
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D4735E] hover:bg-[#b55b47] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-[#D4735E]/20"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#3D2E2E]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#F5EFE6] border-t border-[#D4735E]/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navItems.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-[#3D2E2E] text-lg font-medium py-2 border-b border-[#3D2E2E]/5 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Dashboard – only when logged in */}
              <AnimatePresence>
                {!isLoading && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href="/dashboard"
                      className="text-[#3D2E2E] text-lg font-medium py-2 border-b border-[#3D2E2E]/5 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auth Button */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading-mobile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-12 bg-gray-200 rounded-full animate-pulse mt-4"
                  />
                ) : isAuthenticated ? (
                  <motion.div
                    key="logout-mobile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogoutButton onLogout={logout} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="login-mobile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href="/login">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#D4735E] text-white px-6 py-3 rounded-full font-medium w-full mt-4"
                      >
                        Login
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
