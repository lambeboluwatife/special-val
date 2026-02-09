import {
  Heart,
  ArrowRight,
  Edit,
  CreditCard,
  Share,
  Verified,
  Link2,
  Mail,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="floating-heart top-20 left-10 text-primary">
        <Heart size={130} />
      </div>
      <div className="floating-heart bottom-20 right-10 text-primary rotate-12">
        <Heart size={150} />
      </div>
      <div className="relative min-h-screen flex flex-col">
        <header className="fixed top-0 w-full z-50 px-6 py-4 text-[#221013] font-display">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 rounded-full glass-card border border-white/20 shadow-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-1.5 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">
                ValenTime
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-10">
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#how-it-works"
              >
                How it Works
              </a>
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

        <main className="flex-1 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 z-10">
              <div className="space-y-6">
                <h1 className="font-serif text-5xl font-bold md:text-7xl leading-tight text-[#181112] italic">
                  Ask Her to Be Your{" "}
                  <span className="text-primary not-italic">Valentine</span>, In
                  a Way She’ll Never Forget 💖
                </h1>
                <p className="text-base md:text-lg text-[#221013] max-w-xl leading-relaxed">
                  Create a personalized digital experience that captures your
                  love story in minutes. Designed for the modern romantic.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/create"
                  className="bg-primary text-white text-lg font-bold px-10 py-5 rounded-full premium-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Create Your Valentine Page</span>
                  <ArrowRight size={24} />
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"></div>
                </div>
                <p>Joined by 100+ Nigerian men this month</p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-3xl"></div>
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] p-3 border-[6px] border-[#333] shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative">
                  <div className="absolute top-0 w-full h-6 bg-transparent flex justify-center pt-2">
                    <div className="w-16 h-4 bg-black/90 rounded-full"></div>
                  </div>
                  <div
                    className="h-full w-full bg-cover bg-center"
                    data-alt="Mockup of a mobile phone showing a personalized romantic message with hearts"
                    style={{
                      backgroundImage: `url(
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBsAjQYLP9GT-z0om2BQkz3VnNiSSCaAg91M6jbT293_e9nrphaHyHohfzPFVmrkUih5AelWtmXLzc50Pw0x2-aQpxPJnFcd2_pNaLkXj0drN556YgkV3SZcqbZltYGeFW3-zPVjhhcj2wY9BJiNzJBvWweEB59M0lepJcSclE6Iy4llidAvYA702KTovjkyMdcKRIuxeflL6-GDzLZoPAwRGXMf_wdmxhlHMVFvibKEfCoak4coKGFu8PNrJlhKvD1GPdJ-wa9X04",
                      )`,
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white text-center">
                      <h3 className="font-serif text-2xl italic mb-2">
                        "Will you be mine?"
                      </h3>
                      <p className="text-xs mb-4">
                        You've been the best part of my year...
                      </p>
                      <div className="flex gap-2 justify-center">
                        <div className="px-4 py-2 bg-primary rounded-full text-[10px] font-bold">
                          Yes!
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-[10px] font-bold">
                          Absolutely!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section
          id="how-it-works"
          className="py-24 bg-white/50 dark:bg-white/5 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                How it Works
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The perfect surprise is just three steps away.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-xl border border-gray-100 dark:border-white/10 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Edit size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Fill</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Add your favorite photos, inside jokes, memories, and a sweet
                  message. Our templates make it easy.
                </p>
              </div>
              <div className="glass-card p-10 rounded-xl border border-gray-100 dark:border-white/10 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Pay</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Secure a permanent, beautiful custom link for as low as ₦50.
                  Quick payment via Paystack.
                </p>
              </div>
              <div className="glass-card p-10 rounded-xl border border-gray-100 dark:border-white/10 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Share size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Share</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Send her the custom link and watch her heart melt. A modern
                  gesture she'll show everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Simple, Affordable Pricing
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                No subscriptions. One-time payment till Feb. 15th 2026.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white dark:bg-white/10 p-10 rounded-xl border-2 border-primary flex flex-col gap-8 shadow-xl relative scale-105 z-10">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary uppercase tracking-widest">
                    Premium
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">₦1000</span>
                    <span className="text-gray-500 text-sm font-medium">
                      / once
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={24} className="text-primary" />
                    Custom romantic music
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={24} className="text-primary" />
                    Unlimited photos &amp; videos
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={24} className="text-primary" />
                    Gold-tier animations
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={24} className="text-primary" />
                    Link till Feb. 15th
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
        </section>

        <footer className="mt-auto py-12 px-6 border-t border-gray-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-1 rounded-full">
                <Heart size={24} />
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
                href="/"
              >
                <Home size={24} />
              </Link>
              <Link
                className="text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                <Mail size={24} />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
