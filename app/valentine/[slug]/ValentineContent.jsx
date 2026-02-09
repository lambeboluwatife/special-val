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
  CheckCircle2,
  BadgeCheck,
  PartyPopper,
  Sparkles,
  Mail,
} from "lucide-react";

const Petal = ({ className, delay = 0 }) => (
  <motion.div
    initial={{ y: -20, rotate: 0, opacity: 0 }}
    animate={{
      y: [0, 20, 0],
      rotate: [0, 15, -15, 0],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className={`petal absolute ${className}`}
  />
);

const AmbientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-300/20 dark:bg-primary/5 blur-[150px]"></div>

    {/* Falling Petals */}
    <Petal className="w-4 h-6 top-[10%] left-[15%] rotate-45" delay={0} />
    <Petal className="w-3 h-5 top-[40%] left-[8%] rotate-15" delay={2} />
    <Petal className="w-5 h-7 top-[70%] left-[20%] rotate-110" delay={4} />
    <Petal className="w-4 h-6 top-[15%] right-[12%] -rotate-45" delay={1} />
    <Petal className="w-6 h-8 top-[55%] right-[5%] rotate-80" delay={3} />
    <Petal className="w-3 h-5 top-[85%] right-[18%] -rotate-20" delay={5} />

    {/* Ambient Symbols */}
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [12, 15, 12],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="fixed top-1/4 right-10 opacity-20 dark:opacity-10 pointer-events-none"
    >
      <Sparkles size={120} className="text-primary" />
    </motion.div>
    <motion.div
      animate={{
        y: [0, 20, 0],
        rotate: [-12, -15, -12],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="fixed bottom-1/4 left-10 opacity-20 dark:opacity-10 pointer-events-none"
    >
      <Heart size={100} className="text-primary" />
    </motion.div>
  </div>
);

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
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#c9184a", "#ff4d6d", "#ff8fa3", "#ffccd5"],
      ticks: 300,
    });
    setIsFinal(true);
  };

  const reasons = valentine?.reasons || [
    "The way your eyes light up when you're happy... ✨",
    "Your kindness that makes everyone around you feel loved... 🌸",
    "How you make even the simplest moments feel like magic... 🪄",
    "The beautiful person you are, inside and out... 💗",
  ];

  const steps = [
    {
      id: "intro",
      content: (
        <>
          <motion.div
            initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 5, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              repeat: Infinity,
              duration: 4,
              repeatType: "alternate",
            }}
            className="text-8xl mb-12 drop-shadow-2xl"
          >
            <Mail size={128} strokeWidth={1} className="text-primary/40" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient font-bold leading-tight mb-6">
            <Typewriter
              text={
                valentine?.intro_message ||
                `Hey ${valentine?.her_name || "there"} 😊`
              }
              delay={0}
            />
          </h1>
          <p className="text-xl md:text-2xl text-foreground/60 mb-10 font-light max-w-lg mx-auto leading-relaxed">
            <Typewriter
              text={valentine?.intro_subtext || "I have a tiny secret..."}
              delay={0}
            />
          </p>
          <button
            onClick={nextStep}
            className="px-12 py-5 bg-linear-to-r from-accent-deep via-accent to-accent-soft text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-premium font-bold text-xl btn-premium flex items-center gap-3"
          >
            Open Your Message 💕
          </button>
        </>
      ),
    },
    {
      id: "thinking",
      content: (
        <div className="space-y-8">
          <p className="text-2xl md:text-3xl leading-relaxed text-foreground/80 font-light">
            <Typewriter text="Okay, don’t laugh..." delay={0} />
            <br />
            <span className="italic font-medium text-foreground">
              <Typewriter
                text="but I’ve been thinking about this for a while 🙈"
                delay={800}
              />
            </span>
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            onClick={nextStep}
            className="px-10 py-4 bg-white/40 backdrop-blur-md text-accent-deep rounded-full border border-white transition-all font-bold text-lg glass-hover shadow-sm"
          >
            I’m listening 👀
          </motion.button>
        </div>
      ),
    },
    {
      id: "compliment",
      content: (
        <div className="w-full space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={reasonsStep}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.5 }}
              className="min-h-[160px] flex items-center justify-center text-center px-6"
            >
              <p className="text-2xl md:text-4xl leading-[1.4] font-serif italic text-foreground/90">
                "{reasons[reasonsStep]}"
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center gap-3">
              {reasons.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === reasonsStep ? "w-10 bg-accent-deep" : "w-4 bg-accent/20"}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (reasonsStep < reasons.length - 1) {
                  setReasonsStep(reasonsStep + 1);
                } else {
                  nextStep();
                }
              }}
              className="px-12 py-4 bg-accent-deep text-white rounded-full hover:scale-105 transition-all font-bold text-lg shadow-lg flex items-center gap-2"
            >
              {reasonsStep < reasons.length - 1
                ? "And another thing... ✨"
                : "One final thought... 💓"}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "question",
      content: (
        <div className="relative z-10 flex flex-col min-h-screen w-full -mt-20">
          {/* Internal Navigation for this step */}
          <header className="flex items-center justify-between px-4 py-6 lg:px-10 w-full mb-10">
            <div className="flex items-center gap-3">
              <div className="text-primary flex items-center justify-center">
                <Heart size={32} className="fill-primary" />
              </div>
              <h2 className="text-[#181112] dark:text-white text-xl font-bold tracking-tight">
                Recipient
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2 text-right">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">
                  Personalized For
                </span>
                <span className="text-sm text-[#181112] dark:text-white/80 font-bold">
                  {valentine?.her_name || "Boluwatife"}
                </span>
              </div>
              <div className="size-12 rounded-full border-2 border-primary/20 p-0.5">
                <div
                  className="size-full rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARhzaDXQ8clp-zP9lSwsplqcw4AJVD359MqAHuKtiJKFeUeUM4Rt61hb52Kvmr8dGJT8DBus07vT7vv7b-0x8yBzXnV82hccs5Wc9F733UKO9S_sCtL3msQZXZ-4HnmkcbUo7cTaK3T4aW50tq3gGAXtIbm9j-zrsQXERWTfSiQBibkLAlTJVEpWIjsKCz8d99NtN2naLl8FjdtDeZ_YvrFr3h2xVU_wHtvo0D1dNwhtSHtJYjGzAKls4Q7RKDAMhQg1WZ7KONpFs')",
                  }}
                ></div>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Intro Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-primary/10 mb-8"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-bold text-[#896168] dark:text-primary/80 tracking-widest uppercase">
                {valentine?.her_name || "Bolu"}, I have a special question...
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold italic leading-tight mb-12 text-gradient">
              {valentine?.question || "Will you be my Valentine?"}
            </h1>

            {/* Visual Focus Element */}
            <div className="mb-12 relative inline-block group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              <motion.div
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: -2, scale: 1 }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTIEvZEHhLWfx8S6P33fG3E9-Tdo6NLDRsOXRsdMSb--N5bqaHwTURsVS6IPjW1nhJgRSpUBR6NF98luG3e_gaKlOaovu9xEq-NAik-2WAEjdbEpntm1-TIGn0Kk6BPwG_G9MjjR7DzczDVc5HVQQ41OK4zehF2y8BaVp7LhZBHPc0uAIxt_fXF89LAyUO0HB-V1aWw_3PqLhYqCWtwOB97MZeq_nKvA0qMYeTMUQ69znS_LLlv2s8v5tJWrrKgTo0YNPm9xPiw_M')",
                  }}
                ></div>
              </motion.div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-xl rotate-12">
                <Heart size={40} className="fill-white" />
              </div>
            </div>

            {/* CTA Container */}
            <div className="glass-panel p-4 md:p-8 rounded-[4rem] max-w-2xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center shadow-2xl">
              <button
                onClick={celebrate}
                className="w-full md:w-64 h-20 rounded-full bg-primary text-white text-xl font-black tracking-widest shadow-lg shadow-primary/30 hover:scale-105 hover:bg-[#d62441] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="truncate uppercase tracking-widest font-black">
                  YES
                </span>
                <CheckCircle2 size={24} strokeWidth={3} />
              </button>
              <button
                onClick={celebrate}
                className="w-full md:w-64 h-20 rounded-full bg-primary text-white text-xl font-black tracking-widest shadow-lg shadow-primary/30 hover:scale-110 hover:shadow-primary/50 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="truncate uppercase tracking-widest font-black">
                  ABSOLUTELY
                </span>
                <BadgeCheck size={24} strokeWidth={3} />
              </button>
            </div>

            <p className="mt-8 text-[#896168] dark:text-white/40 text-sm font-bold italic tracking-wide">
              "Every moment with you is a gift I cherish."
            </p>
          </div>

          <footer className="py-12 flex flex-col items-center justify-center gap-4">
            <div className="h-px w-24 bg-primary/20"></div>
            <div className="flex items-center gap-2 opacity-60">
              <p className="text-[10px] text-[#181112] dark:text-white font-black uppercase tracking-[0.3em]">
                Made with love by {valentine?.his_name || "Tolu"} via Recipient
              </p>
              <PartyPopper size={16} className="text-primary" />
            </div>
          </footer>
        </div>
      ),
    },
  ];

  return (
    <ThemeWrapper theme={valentine?.theme}>
      <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
        <div className="mesh-bg" />
        <AmbientBackground />
        <BackgroundMusic trackId={valentine?.music_id} />
        <Hearts type={valentine?.animation_type} />
        <HeartCursor />

        {/* Ambient Effect Blobs */}
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />

        {/* Progress Dots */}
        {!isFinal && (
          <div className="absolute top-12 flex gap-3 z-20">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${
                  i === step ? "w-12 bg-accent-deep" : "w-4 bg-accent/20"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinal ? (
            <Section
              key={steps[step].id}
              className={`max-w-6xl w-full text-center ${step === 3 ? "" : "glass rounded-[4rem] p-12 md:p-20 border-white/60 shadow-xl"}`}
            >
              {steps[step].content}
            </Section>
          ) : (
            <Section
              key="final"
              className="max-w-4xl w-full text-center glass rounded-[4rem] p-12 md:p-20 border-white/60"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="w-full space-y-10"
              >
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient leading-tight tracking-tight">
                  {showCoupons
                    ? "Your Digital Surprises 🎁"
                    : valentine?.final_message ||
                      `You've made me the happiest, ${valentine?.her_name} 🥰`}
                </h2>

                {!showCoupons ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-12"
                  >
                    <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
                      Counting down every second until we share this moment.
                    </p>

                    {/* Countdown */}
                    <div className="flex justify-center gap-6 md:gap-10 py-6">
                      {[
                        { l: "Days", v: timeLeft.days },
                        { l: "Hours", v: timeLeft.hours },
                        { l: "Minutes", v: timeLeft.mins },
                        { l: "Seconds", v: timeLeft.secs },
                      ].map((t, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-3xl md:text-5xl font-black text-accent-deep tracking-tighter mb-1">
                            {t.v.toString().padStart(2, "0")}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-accent/40">
                            {t.l}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-col items-center gap-8">
                      <div className="px-6 py-2 bg-accent/5 rounded-full border border-accent/10">
                        <p className="text-sm font-bold text-accent-deep uppercase tracking-widest">
                          ✨ SAVE THE DATE:{" "}
                          {valentine?.countdown_date
                            ? new Date(
                                valentine.countdown_date,
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "February 14, 2026"}
                        </p>
                      </div>

                      <button
                        onClick={() => setShowCoupons(true)}
                        className="px-12 py-5 bg-linear-to-r from-accent-deep via-accent to-accent-soft text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-premium font-black text-xl tracking-widest btn-premium uppercase"
                      >
                        Reveal My Vows 🎁
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full space-y-10"
                  >
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/40 font-black uppercase tracking-[0.3em]">
                        Gift Coupons
                      </p>
                      <p className="text-lg text-foreground/60 font-medium">
                        Personal promises from me to you
                      </p>
                    </div>

                    <div className="max-h-[50vh] overflow-y-auto px-4 py-2 custom-scrollbar">
                      <CouponBook coupons={valentine?.gifts} />
                    </div>

                    <button
                      onClick={() => setShowCoupons(false)}
                      className="text-accent-deep font-black uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all"
                    >
                      ← Back to Countdown
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </Section>
          )}
        </AnimatePresence>

        <footer className="absolute bottom-8 text-foreground/20 text-[10px] font-black uppercase tracking-[0.5em] text-center w-full">
          Grafted with pure intention by{" "}
          {valentine?.his_name || "Someone special"}
        </footer>
      </main>
    </ThemeWrapper>
  );
}
