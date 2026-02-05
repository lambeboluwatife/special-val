"use client";
import Section from "./components/Section";
import BackgroundMusic from "./components/BackgroundMusic";
import Hearts from "./components/Hearts";
import Typewriter from "./components/Typewriter";
import HeartCursor from "./components/HeartCursor";
import CouponBook from "./components/CouponBook";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
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

  const nextStep = () => setStep((prev) => prev + 1);

  const celebrate = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ff8fa3", "#ffb3c1", "#ffccd5"],
    });
    setIsFinal(true);
  };

  useEffect(() => {
    const vDay = new Date("2026-02-14T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = vDay - now;

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
  }, []);

  const reasons = [
    "The way your eyes light up when you're happy... ✨",
    "Your kindness that makes everyone around you feel loved... 🌸",
    "How you make even the simplest moments feel like magic... 🪄",
    "The beautiful person you are, inside and out... 💗",
  ];

  const steps = [
    {
      id: "intro",
      content: (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{
              repeat: Infinity,
              duration: 4,
              repeatType: "alternate",
            }}
            className="text-6xl mb-8"
          >
            ✉️
          </motion.div>
          <h1 className="text-3xl font-serif text-gradient font-bold leading-tight mb-4">
            <Typewriter text="Hey Adebimpe 😊" delay={500} />
          </h1>
          <p className="text-xl text-foreground/80 mb-6 h-8">
            <Typewriter text="I have a tiny secret..." delay={2000} />
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4000 }}
            onClick={nextStep}
            className="px-8 py-3 bg-accent text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 font-medium"
          >
            Open it 💕
          </motion.button>
        </div>
      ),
    },
    {
      id: "thinking",
      content: (
        <>
          <p className="text-xl leading-relaxed text-foreground/90">
            <Typewriter text="Okay, don’t laugh..." delay={0} />
            <br />
            <span className="italic">
              <Typewriter
                text="but I’ve been thinking about this for a while 🙈"
                delay={1500}
              />
            </span>
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5000 }}
            onClick={nextStep}
            className="mt-6 px-8 py-3 bg-accent-soft/30 text-accent rounded-full border border-accent/20 hover:bg-accent/10 transition-all font-medium"
          >
            I’m listening 👀
          </motion.button>
        </>
      ),
    },
    {
      id: "compliment",
      content: (
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={reasonsStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[120px] flex items-center justify-center"
            >
              <p className="text-xl leading-relaxed font-medium">
                {reasons[reasonsStep]}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {reasons.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === reasonsStep ? "w-6 bg-accent" : "bg-accent/20"}`}
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
            className="mt-8 px-8 py-3 bg-accent text-white rounded-full hover:scale-105 transition-all font-medium"
          >
            {reasonsStep < reasons.length - 1
              ? "Keep going... 🌸"
              : "And finally... 💓"}
          </button>
        </div>
      ),
    },
    {
      id: "question",
      content: (
        <>
          <h2 className="text-4xl font-serif font-bold text-gradient mb-8 leading-tight">
            Adebimpe, will you be my Valentine? 💖
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={celebrate}
              className="flex-1 px-8 py-4 bg-accent text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/30 font-bold text-lg"
            >
              YES 💗
            </button>
            <button
              onClick={celebrate}
              className="flex-1 px-8 py-4 bg-white text-accent border-2 border-accent/10 rounded-2xl hover:bg-accent/5 transition-all font-bold text-lg"
            >
              Of course 🙈
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <BackgroundMusic />
      <Hearts />
      <HeartCursor />

      {/* Ambient Effect Blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* Progress Dots */}
      {!isFinal && (
        <div className="absolute top-10 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-accent" : "bg-accent/20"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isFinal ? (
          <Section key={steps[step].id}>{steps[step].content}</Section>
        ) : (
          <Section key="final">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-full text-center space-y-6"
            >
              <h2 className="text-4xl font-serif font-bold text-gradient">
                {showCoupons
                  ? "Your Special Gifts 🎁"
                  : "You just made my day, Adebimpe 🥰"}
              </h2>

              {!showCoupons ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <p className="text-xl text-foreground/80">
                    I can’t wait to spend Valentine’s with you.
                  </p>

                  {/* Countdown */}
                  <div className="flex justify-center gap-4 py-4">
                    {[
                      { l: "Days", v: timeLeft.days },
                      { l: "Hrs", v: timeLeft.hours },
                      { l: "Mins", v: timeLeft.mins },
                      { l: "Secs", v: timeLeft.secs },
                    ].map((t, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-accent">
                          {t.v}
                        </span>
                        <span className="text-xs uppercase tracking-wider opacity-50">
                          {t.l}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-lg font-medium text-accent">
                    💕 February 14, with me
                  </p>

                  <button
                    onClick={() => setShowCoupons(true)}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-accent to-accent-soft text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg font-bold"
                  >
                    Reveal my gift 🎁
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <p className="text-sm text-foreground/60 mb-2">
                    Claim these tiny promises whenever you like!
                  </p>
                  <CouponBook />
                  <button
                    onClick={() => setShowCoupons(false)}
                    className="mt-6 text-accent/60 text-sm hover:text-accent transition-colors font-medium underline"
                  >
                    Go back 💌
                  </button>
                </motion.div>
              )}
            </motion.div>
          </Section>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 text-foreground/40 text-sm font-light">
        Made with love for Adebimpe
      </footer>
    </main>
  );
}
