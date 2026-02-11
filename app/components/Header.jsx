import Link from 'next/link'
import { Heart } from 'lucide-react'

const Header = () => {
  return (
     <header className="fixed top-0 w-full z-50 px-6 py-4">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 rounded-full glass-card border border-white/20 shadow-sm">
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
                className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full premium-glow hover:scale-105 transition-all"
              >
                Create Page
              </Link>
            </div>
          </nav>
        </header>
  )
}

export default Header