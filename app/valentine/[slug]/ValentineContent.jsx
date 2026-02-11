"use client";

import { useEffect, useState } from "react";
import Section from "../../components/Section";
import BackgroundMusic from "../../components/BackgroundMusic";
import Hearts from "../../components/Hearts";
import Typewriter from "../../components/Typewriter";
import HeartCursor from "../../components/HeartCursor";
import CouponBook from "../../components/CouponBook";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import ThemeWrapper from "../../components/ThemeWrapper";
import {
  Heart,
  Sparkles,
  Mail,
  Music,
  ArrowRight,
  Gift,
  PartyPopper,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

// --- Animation Components ---

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const AmbientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[150px] animate-pulse delay-1000"></div>

    <FloatingElement delay={0} className="top-[15%] left-[10%] opacity-20">
      <Heart size={40} className="text-primary fill-primary" />
    </FloatingElement>
    <FloatingElement delay={2} className="bottom-[20%] right-[15%] opacity-20">
      <Sparkles size={50} className="text-primary" />
    </FloatingElement>
    <FloatingElement delay={1} className="top-[40%] right-[10%] opacity-10">
      <Mail size={30} className="text-primary" />
    </FloatingElement>
    <FloatingElement delay={3} className="bottom-[10%] left-[20%] opacity-15">
      <Music size={35} className="text-primary" />
    </FloatingElement>
  </div>
);

// --- Main Component ---

export default function ValentineContent({ valentine }) {
  const [step, setStep] = useState(0);
  const [isFinal, setIsFinal] = useState(false);
  const [reasonsStep, setReasonsStep] = useState(0);
  const [showCoupons, setShowCoupons] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  // Countdown Logic
  useEffect(() => {
    const targetDate = valentine?.countdown_date
      ? new Date(valentine.countdown_date)
      : new Date("2026-02-14T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [valentine]);

  const nextStep = () => setStep((prev) => prev + 1);

  const celebrate = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
    
    setIsFinal(true);
  };

  const reasons = valentine?.reasons || [
    "The way your eyes light up when you're happy... ✨",
    "Your kindness that makes everyone around you feel loved... 🌸",
    "How you make even the simplest moments feel like magic... 🪄",
    "The beautiful person you are, inside and out... 💗",
  ];

  // Common Button Style
  const ButtonPrimary = ({ onClick, children, className = "" }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 bg-linear-to-r from-primary to-rose-500 text-white rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </motion.button>
  );

  const ButtonSecondary = ({ onClick, children, className = "" }) => (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.8)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 bg-white/60 backdrop-blur-md border border-white/40 text-primary  rounded-full font-medium shadow-sm transition-all flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <ThemeWrapper theme={valentine?.theme}>
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 overflow-hidden font-sans transition-colors duration-500 relative">
        <BackgroundMusic trackId={valentine?.music_id} />
        <Hearts type={valentine?.animation_type} />
        <HeartCursor />
        <AmbientBackground />

        {/* --- Progress Indicator --- */}
        {!isFinal && (
          <div className="fixed top-8 left-0 right-0 flex justify-center gap-2 z-20">
            {[0, 1, 2, 3].map((s) => (
              <motion.div
                key={s}
                initial={false}
                animate={{
                  width: s === step ? 32 : 12,
                  backgroundColor: s === step ? "var(--color-primary)" : "var(--color-primary-transparent)",
                  opacity: s <= step ? 1 : 0.3,
                }}
                className="h-1.5 rounded-full bg-primary transition-all duration-500"
              />
            ))}
          </div>
        )}

        {/* --- Main Card Content --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isFinal ? "final" : step}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`relative z-10 w-full px-6 ${step === 3 && !isFinal ? "max-w-5xl" : "max-w-lg md:max-w-2xl"}`}
          >
            <div className={`relative text-center ${step === 3 && !isFinal ? "" : "bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden"}`}>
              {/* Glass Reflection Effect */}
              {step !== 3 || isFinal ? (
                  <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none rounded-3xl" />
              ) : null}

              {!isFinal ? (
                <>
                  {/* STEP 0: Intro */}
                  {step === 0 && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h1 className="font-serif italic text-5xl md:text-6xl text-primary leading-tight">
                          To my love,<br />
                          {valentine?.her_name || "my heart"}
                        </h1>
                        <p className="text-lg text-slate-600 font-light">
                          <Typewriter
                            text={valentine?.intro_subtext || "I have a tiny secret..."}
                            delay={500}
                          />
                        </p>
                      </div>
                      <div className="pt-4 flex justify-center">
                        <ButtonPrimary onClick={nextStep}>
                          Open Your Message 💖
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}

                  {/* STEP 1: Teaser */}
                  {step === 1 && (
                    <div className="space-y-8">
                       <div className="space-y-2">
                          <p className="text-xl text-slate-600 ">Okay, don't laugh...</p>
                          <h2 className="font-serif italic text-3xl md:text-4xl text-slate-800  leading-relaxed">
                              <Typewriter text="but I've been thinking about this for a while 🙈" delay={300} />
                          </h2>
                      </div>
                      <div className="pt-4 flex justify-center">
                         <ButtonSecondary onClick={nextStep}>
                            I’m listening 👀
                         </ButtonSecondary>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Reasons */}
                  {step === 2 && (
                    <div className="space-y-8 min-h-75 flex flex-col justify-between">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={reasonsStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex-1 flex items-center justify-center"
                        >
                          <h2 className="font-serif italic text-3xl md:text-4xl text-slate-800  leading-snug">
                            "{reasons[reasonsStep]}"
                          </h2>
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex flex-col items-center gap-6">
                         {/* Dots */}
                        <div className="flex justify-center gap-2">
                          {reasons.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 rounded-full transition-all duration-300 ${i === reasonsStep ? "w-8 bg-primary" : "w-2 bg-primary/20"}`}
                            />
                          ))}
                        </div>

                        <ButtonPrimary
                          onClick={() => {
                            if (reasonsStep < reasons.length - 1) {
                              setReasonsStep(reasonsStep + 1);
                            } else {
                              nextStep();
                            }
                          }}
                        >
                          {reasonsStep < reasons.length - 1 ? (
                            <>And another thing... <ArrowRight size={18} /></>
                          ) : (
                            <>One final thought... 💗</>
                          )}
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: The Question */}
                  {step === 3 && (
                    <div className="flex flex-col items-center py-12 md:py-20">
                       {/* Intro Pill */}
                       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-primary/10 mb-8 backdrop-blur-sm">
                          <Sparkles size={14} className="text-primary" />
                          <span className="text-xs md:text-sm font-medium text-[#896168] tracking-wide uppercase">
                            {valentine?.her_name || "Bolu"}, I have a special question...
                          </span>
                       </div>

                      {/* Main Heading */}
                      <h1 className="font-serif text-4xl md:text-7xl font-bold italic leading-tight mb-10 text-gradient px-4">
                        {valentine?.question || "Will you be my Valentine?"}
                      </h1>
                      
                      {/* Visual Focus Element */}
                      <div className="mb-10 relative inline-block group">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                        <motion.div 
                          initial={{ rotate: -2 }}
                          whileHover={{ rotate: 0 }}
                          className="relative w-40 h-40 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                        >
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTIEvZEHhLWfx8S6P33fG3E9-Tdo6NLDRsOXRsdMSb--N5bqaHwTURsVS6IPjW1nhJgRSpUBR6NF98luG3e_gaKlOaovu9xEq-NAik-2WAEjdbEpntm1-TIGn0Kk6BPwG_G9MjjR7DzczDVc5HVQQ41OK4zehF2y8BaVp7LhZBHPc0uAIxt_fXF89LAyUO0HB-V1aWw_3PqLhYqCWtwOB97MZeq_nKvA0qMYeTMUQ69znS_LLlv2s8v5tJWrrKgTo0YNPm9xPiw_M')",
                            }}
                          ></div>
                        </motion.div>
                        <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl rotate-12">
                          <Heart size={32} className="fill-white" />
                        </div>
                      </div>

                      {/* CTA Container */}
                      <div className="glass-panel p-3 md:p-6 rounded-4xl w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-3 justify-center items-center shadow-lg bg-white/30 border border-white/40">
                        <button
                          onClick={celebrate}
                          className="w-full md:w-48 h-14 rounded-full bg-primary text-white text-lg font-bold tracking-wider shadow-md shadow-primary/20 hover:scale-105 hover:bg-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <span>YES</span>
                          <CheckCircle2 size={20} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={celebrate}
                          className="w-full md:w-56 h-14 rounded-full bg-white/80 text-primary  border border-primary/20 text-lg font-bold tracking-wider shadow-sm hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group"
                        >
                           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>ABSOLUTELY</span>
                          <BadgeCheck size={20} strokeWidth={2.5} />
                        </button>
                      </div>

                      <p className="mt-8 text-sm md:text-base text-[#896168] /40 font-medium italic">
                        "Every moment with you is a gift I cherish."
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* FINAL STEP: Celebration */
                <div className="space-y-8">
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ type: "spring", bounce: 0.5 }}
                  >
                      <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
                        {showCoupons ? "Your Gifts 🎁" : "She Said Yes! 🎉"}
                      </h2>
                      <p className="text-lg text-slate-600  px-4">
                        {!showCoupons 
                          ? (valentine?.final_message || "You've made me the happiest person alive! 🥰")
                          : "A little something to make you smile..."
                        }
                      </p>
                  </motion.div>

                  {!showCoupons && (
                    <div className="mt-12 space-y-10 w-full max-w-xl">
                      {/* Countdown Display - Simplified */}
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { l: "Days", v: timeLeft.days },
                          { l: "Hrs", v: timeLeft.hours },
                          { l: "Mins", v: timeLeft.mins },
                          { l: "Secs", v: timeLeft.secs },
                        ].map((t, i) => (
                           <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-white/40 border border-white/30 backdrop-blur-sm">
                              <span className="text-3xl font-serif font-bold text-primary">
                                {t.v.toString().padStart(2, "0")}
                              </span>
                              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">
                                {t.l}
                              </span>
                           </div>
                        ))}
                      </div>

                       <div className="flex justify-center">
                        <ButtonPrimary onClick={() => setShowCoupons(true)} className="px-10 py-4 text-lg">
                           <Gift size={22} />
                           <span>Reveal My Vows & Gifts</span>
                        </ButtonPrimary>
                       </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
               <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                  Made with pure intention by {valentine?.his_name || "Bolu"}
               </p>
            </motion.footer>

          </motion.div>
        </AnimatePresence>

        {/* --- NEW GIFT REVEAL LAYOUT (Full Page Overlay) --- */}
        {showCoupons && (
            <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto custom-scrollbar flex flex-col items-center animate-in fade-in duration-500">
                <Hearts type={valentine?.animation_type} />
                <AmbientBackground />
                <main className="relative z-10 flex-1 w-full max-w-500 px-4 md:px-12 lg:px-24 py-12 flex flex-col items-center">
                    {/* Hero Section */}
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-4">
                            Gift Unwrapping
                        </div>
                        <h1 className="font-serif text-5xl md:text-6xl font-bold italic mb-4 leading-tight text-slate-900">
                            For {valentine?.her_name || "My Love"}, <br/>With Love
                        </h1>
                        <p className="font-sans text-lg text-slate-600 max-w-lg mx-auto">
                            A collection of promises, surprises, and digital tokens for my favorite person.
                        </p>
                    </div>

                    {/* Scrollable Coupon List */}
                    <div className="w-full space-y-8 pb-12">
                        {/* Map over gifts */}
                        {valentine?.gifts?.map((gift, index) => (
                            <div key={index} className="glass-panel bg-white/70 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all duration-500">
                                <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 bg-pink-50 rounded-2xl flex items-center justify-center text-6xl md:text-7xl shadow-inner">
                                        🎁
                                </div>
                                <div className="grow text-center md:text-left">
                                    <span className="font-bold text-primary text-sm tracking-widest uppercase mb-2 block">Token #{index + 1}</span>
                                    <h3 className="font-sans text-2xl md:text-3xl font-bold mb-3 text-slate-800">{gift.title || "Special Gift"}</h3>
                                    <p className="font-serif text-lg text-slate-600 mb-6 italic leading-relaxed">
                                        "{gift.description || "Something special just for you..."}"
                                    </p>
                                   
                                </div>
                            </div>
                        ))}

                        {/* Static Fallback if no gifts */}
                        {(!valentine?.gifts || valentine.gifts.length === 0) && (
                                <div className="glass-panel bg-white/70 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-black/5">
                                <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 bg-pink-50 rounded-2xl flex items-center justify-center text-6xl shadow-inner animate-pulse">
                                    �
                                </div>
                                <div className="grow text-center md:text-left">
                                    <span className="font-bold text-primary text-sm tracking-widest uppercase mb-2 block">Special Delivery</span>
                                    <h3 className="font-sans text-2xl md:text-3xl font-bold mb-3 text-slate-800">Your Gift is on its Way</h3>
                                    <p className="font-serif text-lg text-slate-600 mb-6 italic leading-relaxed">
                                        "My love, the best things in life are worth waiting for. Your special surprise will be revealed to you on the main day! I promise it's worth it. 🌹"
                                    </p>
                                    <button className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all cursor-default">
                                        I'll Be Waiting 💖
                                    </button>
                                </div>
                                </div>
                        )}
                    </div>
                    
                    {/* Return Button for Mobile */}
                        <div className="md:hidden pb-12">
                        <ButtonSecondary onClick={() => setShowCoupons(false)}>
                            ← Back
                        </ButtonSecondary>
                        </div>
                </main>
            </div>
        )}
      </main>
    </ThemeWrapper>
  );
}

