"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";

export function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore-tours", label: "Explore Tours" },
    { href: "/stories", label: "Stories" },
    { href: "/become-a-guide", label: "Become a Guide" },
    // { href: "/dashboard", label: "Dashboard" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getCookie("accessToken");
      setAccessToken(token);
    };
    fetchAccessToken();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F5EFE6]/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="bg-[#D4735E] p-2 rounded-lg text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-[#3D2E2E]">
                TripGuide
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#3D2E2E] hover:text-[#D4735E] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Dashboard – only when logged in */}
            {accessToken && (
              <Link
                href="/dashboard"
                className="text-[#3D2E2E] hover:text-[#D4735E] font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
            {/* {accessToken && (
              <Link
                href="/dashboard"
                className="text-[#3D2E2E] hover:text-[#D4735E] font-medium transition-colors"
              >
                Dashboard
              </Link>
            )} */}

            <Link href="/login" className="text-lg font-medium">
              {accessToken ? (
                <LogoutButton onLogout={() => setAccessToken(null)} />
              ) : (
                <Link href="/login">
                  <button className="bg-[#D4735E] hover:bg-[#b55b47] text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4735E]/20">
                    Sign In
                  </button>
                </Link>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#3D2E2E]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
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
            className="md:hidden bg-[#F5EFE6] border-t border-[#D4735E]/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navItems.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#3D2E2E] text-lg font-medium py-2 border-b border-[#3D2E2E]/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Dashboard – only when logged in */}
              {accessToken && (
                <Link
                  href="/dashboard"
                  className="text-[#3D2E2E] text-lg font-medium py-2 border-b border-[#3D2E2E]/5"
                >
                  Dashboard
                </Link>
              )}
              {/* {accessToken && (
                <Link
                  href="/dashboard"
                  className="text-[#3D2E2E] text-lg font-medium py-2 border-b border-[#3D2E2E]/5"
                >
                  Dashboard
                </Link>
              )} */}

              <Link href="/login" className="text-lg font-medium">
                {accessToken ? (
                  <LogoutButton onLogout={() => setAccessToken(null)} />
                ) : (
                  <Link href="/login">
                    <button className="bg-[#D4735E] text-white px-6 py-3 rounded-full font-medium w-full mt-4">
                      Login
                    </button>
                  </Link>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
