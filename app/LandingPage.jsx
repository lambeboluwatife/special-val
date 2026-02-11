import {
  Heart,
  ArrowRight,
  Edit,
  Wallet,
  Share,
  CheckCircle,
  Verified,
  Link2,
  Mail,
  Home,
  Camera,
  AtSign,
  Hash,
  Github,
} from "lucide-react";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function LandingPage() {
  return (
    <>
      {/* Decorative Elements */}
      <div className="floating-heart top-20 left-10 text-primary">
        <Heart size={130} />
      </div>
      <div className="floating-heart bottom-20 right-10 text-primary rotate-12">
        <Heart size={150} />
      </div>

      <div className="relative min-h-screen flex flex-col">
       <Header />

        {/* Hero Section */}
        <main className="flex-1 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 z-10">
              <div className="space-y-6">
                <h1 className="font-serif font-bold text-5xl md:text-7xl leading-tight text-[#181112] italic">
                  Ask Her to Be Your{" "}
                  <span className="text-primary not-italic">Valentine</span>, In
                  a Way She’ll Never Forget 💖
                </h1>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Create a personalized digital experience that captures your love
                  story in minutes. Designed for the modern romantic.
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
              {/* Phone Mockup */}
              <div className="relative w-70 h-145 bg-black rounded-[3rem] p-3 border-[6px] border-[#333] shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative">
                  <div className="absolute top-0 w-full h-6 bg-transparent flex justify-center pt-2">
                    <div className="w-16 h-4 bg-black/90 rounded-full"></div>
                  </div>
                  <div
                    className="h-full w-full bg-cover bg-center"
                    data-alt="Mockup of a mobile phone showing a personalized romantic message with hearts"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsAjQYLP9GT-z0om2BQkz3VnNiSSCaAg91M6jbT293_e9nrphaHyHohfzPFVmrkUih5AelWtmXLzc50Pw0x2-aQpxPJnFcd2_pNaLkXj0drN556YgkV3SZcqbZltYGeFW3-zPVjhhcj2wY9BJiNzJBvWweEB59M0lepJcSclE6Iy4llidAvYA702KTovjkyMdcKRIuxeflL6-GDzLZoPAwRGXMf_wdmxhlHMVFvibKEfCoak4coKGFu8PNrJlhKvD1GPdJ-wa9X04')",
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

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 bg-white/50 dark:bg-white/5 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">How it Works</h2>
              <p className="text-gray-600 dark:text-gray-400">
                The perfect surprise is just three steps away.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-card p-10 rounded-xl border border-gray-100 hover:border-primary transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Edit size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Fill</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Add your loved one name, inside jokes, memories, and a sweet
                  message. Our templates make it easy.
                </p>
              </div>
              {/* Step 2 */}
              <div className="glass-card p-10 rounded-xl border border-gray-100  hover:border-primary transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Wallet size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Pay</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Secure a permanent, beautiful custom link for as low as ₦1000.
                  Quick payment via Flutterwave.
                </p>
              </div>
              {/* Step 3 */}
              <div className="glass-card p-10 rounded-xl border border-gray-100  hover:border-primary transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Share size={28} />
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

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Simple, Affordable Pricing
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                No subscriptions. One-time payment for eternal memories.
              </p>
            </div>
            <div className="flex items-center justify-center gap-8">              
              {/* Premium Card */}
              <div className="bg-white w-1/2 p-10 rounded-xl border-2 border-primary flex flex-col gap-8 shadow-xl relative scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                  Most Popular
                </div>
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
                    <Verified size={20} className="text-primary" />
                    Custom romantic music
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={20} className="text-primary" />
                    Custom Theme
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={20} className="text-primary" />
                    Heartfelt Message
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Verified size={20} className="text-primary" />
                    Permanent link till Feb. 15th, 2026
                  </li>
                </ul>
                <button className="w-full py-4 rounded-full bg-primary text-white font-bold premium-glow hover:scale-105 transition-all cursor-pointer">
                  Choose Premium
                </button>
              </div>
            </div>
            {/* Gold Accent Circle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
        </section>

       <Footer />
      </div>
    </>
  );
}
