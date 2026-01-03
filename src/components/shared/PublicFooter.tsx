import React from "react";
import { MapPin, Instagram, Twitter, Facebook } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-[#3D2E2E] text-[#F5EFE6] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-[#D4735E] p-2 rounded-lg text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-['Outfit']">
                Trip Guide
              </span>
            </div>
            <p className="text-[#F5EFE6]/60 leading-relaxed">
              Connecting travelers with passionate locals for authentic,
              unforgettable experiences worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-['Outfit']">Company</h4>
            <ul className="space-y-4 text-[#F5EFE6]/60">
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-['Outfit']">
              Community
            </h4>
            <ul className="space-y-4 text-[#F5EFE6]/60">
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Become a Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Ambassadors
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-['Outfit']">Support</h4>
            <ul className="space-y-4 text-[#F5EFE6]/60">
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4735E] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F5EFE6]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F5EFE6]/40 text-sm mb-4 md:mb-0">
            © 2024 LocalEyes Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-[#F5EFE6]/60 hover:text-[#D4735E] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#F5EFE6]/60 hover:text-[#D4735E] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#F5EFE6]/60 hover:text-[#D4735E] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
