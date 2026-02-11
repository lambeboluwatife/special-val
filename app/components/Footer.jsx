import { Heart, Link2, Github, Home } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
        <footer className="mt-auto py-12 px-6 border-t border-gray-100 ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-1 rounded-full">
                <Heart size={16} className="text-primary fill-primary" />
              </div>
              <span className="font-bold text-lg">ValenTime</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ValenTime. Made with ❤️ in Lagos.
            </p>
            <div className="flex gap-6">
              <Link
                className="text-gray-400 hover:text-primary transition-colors"
                href="https://lambeboluwatife.netlify.app/"
              >
                <Link2 size={24} />
              </Link>
              <Link
                className="text-gray-400 hover:text-primary transition-colors"
                href="https://github.com/lambeboluwatife/special-val#"
              >
                <Github size={24} />
              </Link>
              <Link
                className="text-gray-400 hover:text-primary transition-colors"
                href="/"
              >
                <Home size={24} />
              </Link>
            </div>
          </div>
        </footer>
  )
}

export default Footer