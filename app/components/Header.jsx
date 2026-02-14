"use client"

import Link from 'next/link'
import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
     <header className="fixed top-0 w-full z-50 px-6 py-4">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 rounded-full glass-card border border-white/20 shadow-sm relative z-50 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-1.5 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">ValenTime</h2>
            </div>
            <div className="hidden md:flex items-center gap-10">
              <Link
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#how-it-works"
              >
                How it Works
              </Link>
              <Link
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#pricing"
              >
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/create"
                className="hidden sm:block bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full premium-glow hover:scale-105 transition-all"
              >
                Create Page
              </Link>
              <button 
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-primary transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <div 
            className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 transform ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
          >
            <Link
              className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/create"
              className="bg-primary text-white text-xl font-bold px-8 py-4 rounded-full premium-glow hover:scale-105 transition-all shadow-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Your Page
            </Link>
          </div>
        </header>
  )
}

export default Header