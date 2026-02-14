"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Script from "next/script";
import ThemeWrapper from "../components/ThemeWrapper";
import Hearts from "../components/Hearts";
import BackgroundMusic from "../components/BackgroundMusic";
import {
  Heart,
  Palette,
  Sparkles,
  User,
  Edit3,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  GripVertical,
  X,
  PlusCircle,
  Ticket,
  Trash2,
  Music,
  Mail,
  BadgeCheck,
  Rocket,
  ShieldCheck,
  Star,
  Leaf,
  BookOpen,
} from "lucide-react";

const THEMES = [
  {
    id: "classic",
    name: "Classic",
    color: "linear-gradient(to bottom right, #f87171, #db2777)",
  },
  {
    id: "midnight",
    name: "Midnight",
    color: "linear-gradient(to bottom right, #312e81, #581c87, #0f172a)",
  },
  {
    id: "sunset",
    name: "Sunset",
    color: "linear-gradient(to bottom right, #fb923c, #f43f5e)",
  },
  {
    id: "ocean",
    name: "Ocean",
    color: "linear-gradient(to bottom right, #2dd4bf, #0891b2)",
  },
];

const MUSIC = [
  { id: "classic", name: "Classic Valentine" },
  { id: "love_romantic", name: "Love Romantic" },
  { id: "romantic_adventure", name: "Romantic Adventure" },
  { id: "romantic_piano", name: "Romantic Piano" },
  { id: "romantic_dreams", name: "Romantic Dreams" },
];

const ANIMATIONS = [
  { id: "hearts", name: "Hearts", icon: Heart },
  { id: "stars", name: "Stars", icon: Star },
  { id: "petals", name: "Petals", icon: Leaf },
];

export default function CreateValentine() {
  const router = useRouter();

  const [wizardStep, setWizardStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    her_name: "",
    his_name: "",
    message: "",
    intro_message: "",
    intro_subtext: "",
    reasons: [
      "The way you laugh at my dry jokes",
      "How you always know the right song for the mood",
    ],
    question: "",
    final_message: "",
    theme: "classic",
    music_id: "classic",
    animation_type: "hearts",
  });

  const [gifts, setGifts] = useState([
    {
      id: 1,
      icon: "☕",
      title: "Breakfast in Bed",
      desc: "Your favorite treats, served to you.",
    },
    {
      id: 2,
      icon: "🎬",
      title: "Movie Marathon",
      desc: "Blankets, popcorn, and your choice of movies.",
    },
    {
      id: 3,
      icon: "💆‍♀️",
      title: "Massage",
      desc: "A relaxing session to melt away stress.",
    },
    {
      id: 4,
      icon: "🍕",
      title: "Home Picnic",
      desc: "Snacks, drinks, and good vibes.",
    },
  ]);

  const [playMusic, setPlayMusic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flutterwaveLoaded, setFlutterwaveLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonChange = (index, value) => {
    setForm((prev) => {
      const newReasons = [...prev.reasons];
      newReasons[index] = value;
      return { ...prev, reasons: newReasons };
    });
  };

  const addReason = () => {
    setForm((prev) => ({
      ...prev,
      reasons: [...prev.reasons, ""],
    }));
  };

  const removeReason = (index) => {
    setForm((prev) => ({
      ...prev,
      reasons: prev.reasons.filter((_, i) => i !== index),
    }));
  };

  const handleGiftChange = (id, field, value) => {
    setGifts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)),
    );
  };

  const addGift = () => {
    const newId =
      gifts.length > 0 ? Math.max(...gifts.map((g) => g.id)) + 1 : 1;
    setGifts([...gifts, { id: newId, icon: "🎁", title: "", desc: "" }]);
  };

  const removeGift = (id) => {
    setGifts(gifts.filter((g) => g.id !== id));
  };

  const nextWizardStep = () => setWizardStep((prev) => Math.min(prev + 1, 3));
  const prevWizardStep = () => setWizardStep((prev) => Math.max(prev - 1, 1));

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!form.her_name || !form.his_name) {
      setError("Both names are required.");
      setLoading(false);
      setWizardStep(1);
      return;
    }

    if (!form.email) {
      setError("Email is required for payment.");
      setLoading(false);
      return;
    }

    if (!process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY) {
      setError("Payment system not configured. Please contact support.");
      setLoading(false);
      return;
    }

    if (!flutterwaveLoaded || !window.FlutterwaveCheckout) {
      setError("Payment system is loading. Please try again in a moment.");
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      reasons: form.reasons.filter((r) => r.trim() !== ""),
      gifts: gifts.filter((g) => g.title.trim() !== ""),
    };

    // Use Flutterwave Inline
    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `val-${Date.now()}`,
      amount: 2500,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: form.email,
        name: form.his_name,
      },
      customizations: {
        title: "Valentine Page",
        description: "Create a personalized Valentine page 💖",
        logo: "",
      },
      callback: async (response) => {
        console.log("Payment response:", response);

        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_id: response.transaction_id,
              payload,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Payment verification failed");
          }

          router.push(`/valentine/${data.slug}`);
        } catch (err) {
          console.error("Verification error:", err);
          setError(err.message || "Payment verification failed");
        } finally {
          setLoading(false);
        }
      },
      onclose: () => {
        console.log("Payment modal closed");
        setLoading(false);
      },
    });
  };

  const wizardTabs = [
    { id: 1, name: "The Identity", icon: Heart },
    { id: 2, name: "Our Journey", icon: BookOpen },
    { id: 3, name: "Finalize Magic", icon: Sparkles },
  ];

  return (
    <ThemeWrapper theme={form.theme}>
      {/* Load Flutterwave Inline Script */}
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Flutterwave script loaded");
          setFlutterwaveLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Flutterwave script");
          setError("Payment system failed to load. Please refresh the page.");
        }}
      />

      <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col items-center">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 w-full">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-full">
              <Heart size={18} className="text-primary fill-primary" />
            </div>
            <h2 className="text-[#181112] dark:text-white text-lg font-bold leading-tight tracking-tight">
              Omo Mi Builder
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            <div className="hidden md:flex items-center gap-8">
              <a
                className="text-[#181112] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-[#181112] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Inspiration
              </a>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
            <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              <span>Save Draft</span>
            </button>
          </div>
        </header>

        <main
          className={`w-full max-w-[1200px] px-4 py-8 relative z-10 flex flex-col ${wizardStep === 2 || wizardStep === 3 ? "lg:flex-row gap-10" : "items-center"}`}
        >
          <div
            className={
              wizardStep === 2 || wizardStep === 3
                ? "flex-1 flex flex-col gap-8"
                : "w-full max-w-4xl"
            }
          >
            <Hearts type={form.animation_type} />
            {playMusic && <BackgroundMusic trackId={form.music_id} />}

            {/* Progress Bar Section */}
            <div className="flex flex-col gap-4 mb-10 px-4">
              <div className="flex items-center justify-between">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Step {wizardStep} of 3
                </span>
                <p className="text-[#181112] dark:text-white text-sm font-semibold">
                  {Math.round((wizardStep / 3) * 100)}% Complete
                </p>
              </div>
              <div className="h-3 w-full bg-[#e6dbdd] dark:bg-zinc-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(238,43,75,0.4)]"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                ></div>
              </div>
              <p className="text-[#896168] dark:text-zinc-400 text-sm italic">
                {wizardStep === 1 &&
                  '"Love is a beautiful journey, let\'s start yours..."'}
                {wizardStep === 2 &&
                  '"Every story is unique, tell yours with heart..."'}
                {wizardStep === 3 && '"The final touch to your masterpiece..."'}
              </p>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl shadow-primary/5 p-8 md:p-12 border border-white/50 dark:border-zinc-800">
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-8 p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handlePay}>
                {wizardStep === 1 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-12"
                  >
                    {/* Title Section */}
                    <div className="text-center md:text-left">
                      <h1 className="text-[#181112] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-3">
                        The Identity
                      </h1>
                      <p className="text-[#896168] dark:text-zinc-400 text-lg">
                        Let's start with the basics of your Valentine's story.
                      </p>
                    </div>

                    {/* Input Fields Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-bold text-[#181112] dark:text-zinc-300 mb-2 ml-1">
                          Who is this for? (Recipient)
                        </label>
                        <input
                          name="her_name"
                          value={form.her_name}
                          onChange={handleChange}
                          className="w-full h-16 px-6 bg-background-light dark:bg-zinc-900 border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-full text-lg outline-none transition-all dark:text-white placeholder:text-zinc-400"
                          placeholder="e.g. My Queen, Tolu, Adesua"
                          type="text"
                        />
                        <User
                          className="absolute right-6 top-[52px] text-zinc-300 group-focus-within:text-primary transition-colors"
                          size={20}
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-sm font-bold text-[#181112] dark:text-zinc-300 mb-2 ml-1">
                          Who is the sender? (Your Name)
                        </label>
                        <input
                          name="his_name"
                          value={form.his_name}
                          onChange={handleChange}
                          className="w-full h-16 px-6 bg-background-light dark:bg-zinc-900 border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-full text-lg outline-none transition-all dark:text-white placeholder:text-zinc-400"
                          placeholder="e.g. Your King, Chidi, Femi"
                          type="text"
                        />
                        <Edit3
                          className="absolute right-6 top-[52px] text-zinc-300 group-focus-within:text-primary transition-colors"
                          size={20}
                        />
                      </div>
                    </div>

                    {/* Visual Theme Grid */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Palette className="text-primary" size={24} />
                        <h2 className="text-[#181112] dark:text-white text-2xl font-bold">
                          Visual Theme
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {THEMES.map((theme) => (
                          <div
                            key={theme.id}
                            onClick={() =>
                              setForm((prev) => ({ ...prev, theme: theme.id }))
                            }
                            className="group cursor-pointer"
                          >
                            <div
                              className={`aspect-square rounded-lg mb-3 border-4 shadow-md group-hover:shadow-xl transition-all flex items-center justify-center ${
                                form.theme === theme.id
                                  ? "border-primary"
                                  : "border-white dark:border-zinc-700"
                              }`}
                              style={{ background: theme.color }}
                            >
                              {form.theme === theme.id && (
                                <CheckCircle2
                                  className="text-white bg-primary rounded-full"
                                  size={32}
                                />
                              )}
                            </div>
                            <p
                              className={`text-center font-bold ${form.theme === theme.id ? "text-primary" : "text-[#181112] dark:text-white"}`}
                            >
                              {theme.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Animation Selector */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-primary">
                          auto_awesome
                        </span>
                        <h2 className="text-[#181112] dark:text-white text-2xl font-bold">
                          Animation Type
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {ANIMATIONS.map((anim) => (
                          <button
                            key={anim.id}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                animation_type: anim.id,
                              }))
                            }
                            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all border-2 ${
                              form.animation_type === anim.id
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                                : "bg-background-light dark:bg-zinc-800 text-[#181112] dark:text-white border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            }`}
                          >
                            <anim.icon size={20} />
                            {anim.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 1 Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[#e6dbdd] dark:border-zinc-800">
                      <div className="flex items-center gap-2 text-[#896168] dark:text-zinc-400">
                        <Lock size={14} />
                        <span className="text-xs uppercase font-bold tracking-widest">
                          Your data is private
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={nextWizardStep}
                        className="w-full md:w-auto min-w-[280px] h-16 bg-primary text-white text-xl font-extrabold rounded-full flex items-center justify-center gap-3 shadow-xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                      >
                        Next: Our Journey
                        <ArrowRight
                          className="group-hover:translate-x-1 transition-transform"
                          size={20}
                        />
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-12"
                  >
                    {/* Progress Header */}
                    <div className="flex flex-col gap-4 bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl border border-primary/5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
                          Step 02 of 03
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          66% Complete
                        </span>
                      </div>
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: "66%" }}
                        ></div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-black text-[#181112] dark:text-white mb-2">
                          The Narrative
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                          This is where the magic happens. Tell your story in
                          your own words. Use these fields to craft a message
                          that will make her heart gbedu.
                        </p>
                      </div>
                    </div>

                    {/* Step 2.1: The Hook */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-8 bg-primary text-white rounded-full text-sm font-bold">
                          1
                        </span>
                        <h3 className="text-xl font-bold dark:text-white">
                          The Opening Hook
                        </h3>
                      </div>
                      <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex justify-between">
                            Intro Message (Hero Title)
                            <span className="font-normal text-xs text-gray-400 italic font-serif">
                              Serif Style Preview
                            </span>
                          </label>
                          <textarea
                            name="intro_message"
                            className="w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900 p-4 text-2xl font-serif italic focus:ring-primary focus:border-primary min-h-[140px] dark:text-white outline-none"
                            placeholder="e.g., To my Omalicha, the one who makes my world spin..."
                            value={form.intro_message}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Teaser Subtext
                          </label>
                          <input
                            name="intro_subtext"
                            className="w-full rounded-full border-gray-200 dark:border-gray-800 dark:bg-gray-900 px-6 py-4 text-base focus:ring-primary focus:border-primary dark:text-white outline-none"
                            placeholder="A short sentence that appears right under the title."
                            type="text"
                            value={form.intro_subtext}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </section>

                    {/* Step 2.2: Reasons I Love You */}
                    <section className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center size-8 bg-primary text-white rounded-full text-sm font-bold">
                            2
                          </span>
                          <h3 className="text-xl font-bold dark:text-white">
                            Reasons I Love You
                          </h3>
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-md">
                          Carousel Feature
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-11">
                        Add things you love about her. These will scroll
                        beautifully as a carousel on her personalized page.
                      </p>

                      <div className="ml-11 space-y-3">
                        {form.reasons.map((reason, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-2 pr-4 rounded-full shadow-sm"
                          >
                            <div className="size-8 flex items-center justify-center text-gray-300 cursor-grab">
                              <span className="material-symbols-outlined text-lg">
                                drag_indicator
                              </span>
                            </div>
                            <input
                              className="flex-1 border-none focus:ring-0 bg-transparent text-gray-800 dark:text-gray-200 p-0 text-sm outline-none"
                              type="text"
                              value={reason}
                              onChange={(e) =>
                                handleReasonChange(index, e.target.value)
                              }
                              placeholder="Type a reason..."
                            />
                            <button
                              type="button"
                              onClick={() => removeReason(index)}
                              className="text-gray-300 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">
                                close
                              </span>
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addReason}
                          className="w-full group flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 p-2 pr-4 rounded-full transition-colors hover:border-primary/30"
                        >
                          <div className="size-8 flex items-center justify-center text-gray-300 group-hover:text-primary">
                            <span className="material-symbols-outlined text-lg">
                              add_circle
                            </span>
                          </div>
                          <span className="text-sm text-gray-400 group-hover:text-primary">
                            Add a new reason...
                          </span>
                        </button>
                      </div>
                    </section>

                    {/* Step 2 Footer */}
                    <div className="flex items-center justify-between pt-10 border-t border-primary/10">
                      <button
                        type="button"
                        onClick={prevWizardStep}
                        className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors"
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={nextWizardStep}
                        className="flex items-center gap-2 px-10 py-3 rounded-full bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform active:scale-95"
                      >
                        Next: Finalize Magic
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Merged Final Step: Step 3 - Vows & Gifts */}
                {wizardStep === 3 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-12"
                  >
                    {/* Progress Header */}
                    <div className="flex flex-col gap-4 bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl border border-primary/5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
                          Step 03 of 03
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          100% Complete
                        </span>
                      </div>
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-black text-[#181112] dark:text-white mb-2">
                          Vows & Digital Gifts
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                          Write your final romantic vow and create custom
                          digital coupons she can redeem for special treats.
                        </p>
                      </div>
                    </div>

                    {/* Vow Section */}
                    <section className="bg-white dark:bg-[#2d181b] p-8 rounded-xl border border-[#e6dbdd] dark:border-[#3a2226] shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary">
                          auto_awesome
                        </span>
                        <h3 className="text-xl font-bold dark:text-white">
                          The Proposal & Vow
                        </h3>
                      </div>
                      <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-zinc-300">
                            The Big Question
                          </label>
                          <input
                            name="question"
                            type="text"
                            className="w-full h-12 px-6 bg-[#fdfafb] dark:bg-[#221013] border border-[#e6dbdd] dark:border-[#3a2226] rounded-full text-sm outline-none transition-all dark:text-white focus:border-primary"
                            placeholder="Will you be my Valentine? 💖"
                            value={form.question}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-zinc-300">
                            Your Success Vow (Final Message)
                          </label>
                          <textarea
                            name="final_message"
                            className="w-full rounded-xl border-[#e6dbdd] dark:border-[#3a2226] bg-[#fdfafb] dark:bg-[#221013] focus:ring-primary focus:border-primary p-5 text-base min-h-[160px] dark:text-white outline-none"
                            placeholder="e.g., To my forever Valentine, Omalicha, I promise to always be your peace and to love you more with every sunrise..."
                            value={form.final_message}
                            onChange={handleChange}
                          />
                          <p className="mt-1 text-xs text-[#896168] dark:text-[#c0a2a7]">
                            This message appears when she finishes exploring the
                            page.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Coupons Section */}
                    <section className="bg-white dark:bg-[#2d181b] p-8 rounded-xl border border-[#e6dbdd] dark:border-[#3a2226] shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">
                            confirmation_number
                          </span>
                          <h3 className="text-xl font-bold dark:text-white">
                            Digital Gift Coupons
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {gifts.map((gift) => (
                          <div
                            key={gift.id}
                            className="flex flex-wrap md:flex-nowrap items-start gap-4 p-4 border border-dashed border-primary/30 rounded-xl bg-primary/5 group relative"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const emojis = [
                                  "🌹",
                                  "💋",
                                  "💎",
                                  "🏡",
                                  "🍔",
                                  "🛫",
                                  "🎁",
                                ];
                                const currentIdx = emojis.indexOf(gift.icon);
                                const nextIdx =
                                  (currentIdx + 1) % emojis.length;
                                handleGiftChange(
                                  gift.id,
                                  "icon",
                                  emojis[nextIdx],
                                );
                              }}
                              className="size-12 rounded-full bg-white dark:bg-[#221013] border border-[#e6dbdd] dark:border-[#3a2226] flex items-center justify-center text-2xl shadow-sm hover:scale-105 transition-transform"
                            >
                              {gift.icon}
                            </button>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                className="w-full bg-white dark:bg-[#221013] border-[#e6dbdd] dark:border-[#3a2226] rounded-lg text-sm font-bold dark:text-white"
                                placeholder="Coupon Title"
                                type="text"
                                value={gift.title}
                                onChange={(e) =>
                                  handleGiftChange(
                                    gift.id,
                                    "title",
                                    e.target.value,
                                  )
                                }
                              />
                              <input
                                className="w-full bg-white dark:bg-[#221013] border-[#e6dbdd] dark:border-[#3a2226] rounded-lg text-sm dark:text-zinc-400"
                                placeholder="Short description"
                                type="text"
                                value={gift.desc}
                                onChange={(e) =>
                                  handleGiftChange(
                                    gift.id,
                                    "desc",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeGift(gift.id)}
                              className="text-[#896168] hover:text-primary p-2 transition-colors"
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addGift}
                          className="w-full py-4 border-2 border-dashed border-[#e6dbdd] dark:border-[#3a2226] rounded-xl text-[#896168] font-semibold flex items-center justify-center gap-2 hover:bg-background-light dark:hover:bg-background-dark/30 transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            add_circle
                          </span>
                          Add Another Coupon
                        </button>
                      </div>
                    </section>

                    {/* Final Touches: Music & Email */}
                    <section className="bg-white dark:bg-[#2d181b] p-8 rounded-xl border border-[#e6dbdd] dark:border-[#3a2226] shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary">
                          tune
                        </span>
                        <h3 className="text-xl font-bold dark:text-white">
                          The Final Details
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Soundtrack
                          </label>
                          <div className="flex gap-3">
                            <select
                              name="music_id"
                              value={form.music_id}
                              onChange={handleChange}
                              className="flex-1 h-12 px-4 bg-[#fdfafb] dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm outline-none transition-all dark:text-white appearance-none cursor-pointer"
                            >
                              {MUSIC.map((track) => (
                                <option key={track.id} value={track.id}>
                                  {track.name}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => setPlayMusic(!playMusic)}
                              className={`size-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                                playMusic
                                  ? "bg-primary text-white"
                                  : "bg-white dark:bg-zinc-800 text-primary border border-primary/20"
                              }`}
                            >
                              <span className="material-symbols-outlined">
                                {playMusic ? "stop" : "play_arrow"}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                            Your Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="w-full h-12 px-6 bg-[#fdfafb] dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm outline-none transition-all dark:text-white"
                            placeholder="To receive your unique link"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </section>

                    {/* Payment Summary Card */}
                    <div className="mt-12 p-px bg-linear-to-r from-primary/40 to-[#ff7e93] rounded-xl overflow-hidden">
                      <div className="bg-white dark:bg-[#2d181b] p-8 rounded-[0.9rem] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <span
                              className="material-symbols-outlined text-3xl text-primary"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              rocket_launch
                            </span>
                          </div>
                          <div className="text-left">
                            <h4 className="text-xl font-extrabold dark:text-white">
                              Final Package
                            </h4>
                            <p className="text-sm text-[#896168] dark:text-[#c0a2a7]">
                              Live URL till Feb. 15th 2026 + All premium
                              features
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-black block text-primary">
                            ₦1,000
                          </span>
                          <span className="text-xs text-[#896168] dark:text-[#c0a2a7] uppercase tracking-tighter">
                            One-time payment
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pay Button Area */}
                    <div className="flex flex-col items-center gap-8 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-md py-5 bg-primary text-white text-lg font-black rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? "Designing Magic..." : "Pay & Generate Link"}
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>

                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOwDkYVW-BWyEmyorwFXQV75fvARcaqNNwODv5akB_1Y9p_qSM_DsMK2MFsyjPnAXFuWWektxih7ZfXmG6aMQA-OVJUVbxS-gI9TUsj6rV--mWv0t1uLspWv2dnTDdyxxGpIR40Z4BAgmvrNRWU2RmsgcR4w-obX0IyjGPUbCEQoAT8oUC09knoQb_zsp-hxX8VhlYHJXDwBRHEPAQntgFYioatNHSr9ekQmlR39KubWhAyukCsafo2dndTv_ggF-omM6qKmqcynY"
                            alt="Visa"
                            className="h-4"
                          />
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGxlpw3f97Lx9uuXcsK3gK4V1kwtySKCgx26HwOQ1jKn8UdxrfAntMsQybpfRIQWg8skiBbzURlYTmdMVICrIzFnRhtZwxz3W4061al8emdAW0qH_fKq9sWB8Fuf2wAZhxoNTlc8bPsSqcmm3WMOMrKHDMM8AbSvJQyWN8cbwSI4NVOfcTIUWCrMvZyYFIBUu12g0QRIcoBhzqWv2dnTDdyxxGpIR40Z4BAgmvrNRWU2RmsgcR4w-obX0IyjGPUbCEQoAT8oUC09knoQb_zsp-hxX8VhlYHJXDwBRHEPAQntgFYioatNHSr9ekQmlR39KubWhAyukCsafo2dndTv_ggF-omM6qKmqcynY"
                            alt="Mastercard"
                            className="h-6"
                          />
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbSfvs4KL0zqbIIpT3-tzwR99L62D_cWCgMe6slO1LeJ7q6POKrlqpX1L13fx9Gf44aB6WhKePqPwFN4ed3sxIpHQhID-mmk0vcK_PGLcdSPnDX-mttiwaeCRfHDWgJizYvlN2aRYZjmVmbAv8rQbcFlsyz1un0ps8twShf0VWA4HOW5pKeMVdfw9r3eGnrrC6ppArS53NsvL1uLlSSpzOrgSO4rkHf4MBHpx_D6mjX5x2KcFW9aVwVfC0DZ7vg7TWvko71zI0JLM"
                            alt="Verve"
                            className="h-6"
                          />
                        </div>
                        <p className="text-[10px] font-bold text-[#896168] dark:text-[#c0a2a7] flex items-center gap-1 uppercase tracking-[0.2em]">
                          <span className="material-symbols-outlined text-xs">
                            lock
                          </span>
                          Secured by Paystack
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={prevWizardStep}
                        className="text-[#896168] dark:text-zinc-500 font-bold hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">
                          arrow_back
                        </span>
                        Go back to edit
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-12 text-center text-[#896168] dark:text-zinc-500 opacity-60">
            <p className="text-sm font-bold">
              Made with{" "}
              <span className="text-primary inline-block align-middle">
                <span className="material-symbols-outlined text-sm">
                  favorite
                </span>
              </span>{" "}
              for Nigerian Love Stories
            </p>
          </div>
        </main>
      </div>
    </ThemeWrapper>
  );
}
