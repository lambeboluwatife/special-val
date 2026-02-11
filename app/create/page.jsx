"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Script from "next/script";
import ThemeWrapper from "../components/ThemeWrapper";
import Hearts from "../components/Hearts";
import BackgroundMusic from "../components/BackgroundMusic";
import {
  Heart,
  User,
  Edit,
  Palette,
  CheckCircle,
  Sparkles,
  Star,
  Flower,
  Lock,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  GripVertical,
  X,
  PlusCircle,
  Ticket,
  Info,
  Trash2,
  Rocket,
  Play,
  Square,
  Music,
  CreditCard,
  BookOpen,
  Sliders,
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
  {
    id: "rose",
    name: "Rose",
    color: "linear-gradient(to bottom right, #e11d48, #9f1239)",
  },
  {
    id: "lavender",
    name: "Lavender",
    color: "linear-gradient(to bottom right, #9333ea, #581c87)",
  },
  {
    id: "golden",
    name: "Golden",
    color: "linear-gradient(to bottom right, #d97706, #b45309)",
  },
  {
    id: "berry",
    name: "Berry",
    color: "linear-gradient(to bottom right, #db2777, #9d174d)",
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
  { id: "petals", name: "Petals", icon: Flower },
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
      amount: 1000,
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

      <div className="min-h-screen bg-white font-display flex flex-col items-center">
    <Header  />

        <main
          className={`w-full max-w-7xl px-4 py-8 relative z-10 mt-20 flex flex-col ${wizardStep === 2 ? "lg:flex-row gap-10" : "items-center"}`}
        >
          <div
            className={
              wizardStep === 2
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
                <p className="text-[#181112] text-sm font-semibold">
                  {Math.round((wizardStep / 3) * 100)}% Complete
                </p>
              </div>
              <div className="h-3 w-full bg-[#e6dbdd] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(238,43,75,0.4)]"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                ></div>
              </div>
              <p className="text-[#896168] text-sm italic">
                {wizardStep === 1 &&
                  '"Love is a beautiful journey, let\'s start yours..."'}
                {wizardStep === 2 &&
                  '"Every story is unique, tell yours with heart..."'}
                {wizardStep === 3 && '"The final touch to your masterpiece..."'}
              </p>
            </div>

            <div
              className={`bg-card-light rounded-xl shadow-2xl shadow-primary/5 p-8 md:p-12 border-2 border-primary ${wizardStep === 3 ? "bg-white" : ""}`}
            >
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
                      <h1 className="text-[#181112] text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-3">
                        The Identity
                      </h1>
                      <p className="text-[#896168] text-lg">
                        Let's start with the basics of your Valentine's story.
                      </p>
                    </div>

                    {/* Input Fields Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-bold text-[#181112] mb-2 ml-1">
                          Who is this for? (Recipient)
                        </label>
                        <input
                          name="her_name"
                          value={form.her_name}
                          onChange={handleChange}
                          className="w-full h-16 px-6 bg-background-light  border-2 border-primary focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-full text-base md:text-lg outline-none transition-all placeholder:text-zinc-400"
                          placeholder="e.g. My Queen, Tolu, Adesua"
                          type="text"
                        />
                        <div className="absolute right-6 top-13 text-zinc-300 group-focus-within:text-primary transition-colors">
                          <User />
                        </div>
                      </div>
                      <div className="relative group">
                        <label className="block text-sm font-bold text-[#181112] mb-2 ml-1">
                          Who is the sender? (Your Name)
                        </label>
                        <input
                          name="his_name"
                          value={form.his_name}
                          onChange={handleChange}
                          className="w-full h-16 px-6 bg-background-light  border-2 border-primary focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-full text-base md:text-lg outline-none transition-all placeholder:text-zinc-400"
                          placeholder="e.g. Your King, Chidi, Femi"
                          type="text"
                        />
                        <div className="absolute right-6 top-13 text-zinc-300 group-focus-within:text-primary transition-colors">
                          <Edit />
                        </div>
                      </div>
                    </div>

                    {/* Visual Theme Grid */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Palette className="text-primary" />
                        <h2 className="text-[#181112] text-2xl font-bold">
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
                                  : "border-white"
                              }`}
                              style={{ background: theme.color }}
                            >
                              <CheckCircle
                                className={`text-white transition-opacity ${
                                  form.theme === theme.id
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                                }`}
                                size={32}
                              />
                            </div>
                            <p
                              className={`text-center font-bold ${form.theme === theme.id ? "text-primary" : "text-[#181112]"}`}
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
                        <Sparkles className="text-primary" />
                        <h2 className="text-[#181112] text-2xl font-bold">
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
                                : "bg-background-light text-[#181112] border-primary hover:bg-zinc-100"
                            }`}
                          >
                            <anim.icon />
                            {anim.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 1 Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[#e6dbdd]">
                      <div className="flex items-center gap-2 text-[#896168]">
                        <Lock size={16} />
                        <span className="text-xs uppercase font-bold tracking-widest">
                          Your data is private
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={nextWizardStep}
                        className="w-full md:w-auto min-w-70 h-16 bg-primary text-white text-xl font-extrabold rounded-full flex items-center justify-center gap-3 shadow-xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all group pointer-events-auto cursor-pointer"
                      >
                        Next: Our Journey
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                    <div>
                      <h1 className="text-4xl font-black text-[#181112] mb-2">
                        The Narrative
                      </h1>
                      <p className="text-gray-500  text-base leading-relaxed">
                        This is where the magic happens. Tell your story in your
                        own words. Use these fields to craft a message that will
                        make her heart gbedu.
                      </p>
                    </div>

                    {/* Step 2.1: The Hook */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-8 bg-primary text-white rounded-full text-sm font-bold">
                          1
                        </span>
                        <h3 className="text-xl font-bold">
                          The Opening Hook
                        </h3>
                      </div>
                      <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-700  ml-1 flex justify-between">
                            Intro Message (Hero Title)
                            <span className="font-normal text-xs text-gray-400 italic font-serif">
                              Serif Style Preview
                            </span>
                          </label>
                          <textarea
                            name="intro_message"
                            className="w-full rounded-xl border-2 border-primary  p-4 text-sm md:text-base font-serif italic focus:ring-primary focus:border-primary min-h-35 outline-none"
                            placeholder="e.g., To my Omalicha, the one who makes my world spin..."
                            value={form.intro_message}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-700  ml-1">
                            Teaser Subtext
                          </label>
                          <input
                            name="intro_subtext"
                            className="w-full rounded-full border-2 border-primary px-6 py-4 text-sm md:text-base focus:ring-primary focus:border-primary outline-none"
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
                          <h3 className="text-xl font-bold">
                            Reasons I Love You
                          </h3>
                        </div>
                       
                      </div>
                      <p className="text-sm text-gray-500">
                        Add things you love about her. These will scroll
                        beautifully as a carousel on her personalized page.
                      </p>

                      <div className="space-y-3">
                        {form.reasons.map((reason, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-3 bg-white  border border-gray-100  p-2 pr-4 rounded-full shadow-sm"
                          >
                            <div className="size-8 flex items-center justify-center text-gray-300 cursor-grab">
                              <GripVertical size={18} />
                            </div>
                            <input
                              className="flex-1 border-none focus:ring-0 bg-transparent text-gray-800 p-0 text-sm outline-none"
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
                              className="text-primary hover:text-primary transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addReason}
                          className="w-full group flex items-center gap-3 bg-white  border-2 border-dashed border-gray-200  p-2 pr-4 rounded-full transition-colors hover:border-primary/30"
                        >
                          <div className="size-8 flex items-center justify-center text-gray-300 group-hover:text-primary">
                            <PlusCircle size={18} />
                          </div>
                          <span className="text-sm text-gray-400 group-hover:text-primary">
                            Add a new reason...
                          </span>
                        </button>
                      </div>
                    </section>

                    {/* Step 2 Footer */}
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-10 border-t border-primary/10">
                      <button
                        type="button"
                        onClick={prevWizardStep}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft />
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={nextWizardStep}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer"
                      >
                        Next: Finalize Magic
                        <ArrowRight />
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
                    <div className="text-center md:text-left">
                      <h1 className="text-4xl font-black text-[#181112] mb-2">
                        Vows & Digital Gifts
                      </h1>
                      <p className="text-gray-500  text-base leading-relaxed">
                        Write your final romantic vow and romantic gifts or things to do for your partner.
                      </p>
                    </div>

                    {/* Vow Section */}
                    <section className="bg-white p-4 md:p-8 rounded-xl border border-[#e6dbdd] shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="text-primary" />
                        <h3 className="text-xl font-bold">
                          The Success Vow
                        </h3>
                      </div>
                      <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold mb-1 text-gray-700">
                            Your Final Message
                          </label>
                          <textarea
                            name="final_message"
                            className="w-full rounded-xl border-[#e6dbdd]  bg-[#fdfafb] focus:ring-primary focus:border-primary p-5 text-sm md:text-base min-h-40 outline-none"
                            placeholder="e.g., To my forever Valentine, Omalicha, I promise to always be your peace and to love you more with every sunrise..."
                            value={form.final_message}
                            onChange={handleChange}
                          />
                          <p className="mt-1 text-xs text-[#896168]">
                            This message appears when she finishes exploring the
                            page.
                          </p>
                        </div>
                        {/* Hidden question field as it's not in the design but in state - keeping logic */}
                        <div className="hidden">
                          <input
                            name="question"
                            value={form.question}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </section>

                    {/* Coupons Section */}
                    <section className="bg-white p-4 md:p-8 rounded-xl border border-[#e6dbdd]  shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <Ticket className="text-primary" />
                          <h3 className="text-xl font-bold">
                            Digital Gifts
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
                              className="size-12 rounded-full bg-white border border-[#e6dbdd]  flex items-center justify-center text-2xl shadow-sm hover:scale-105 transition-transform"
                            >
                              {gift.icon}
                            </button>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                className="w-full bg-white border-[#e6dbdd]  rounded-lg text-sm font-bold"
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
                                className="w-full bg-white border-[#e6dbdd]  rounded-lg text-sm"
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
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addGift}
                          className="w-full py-4 border-2 border-dashed border-[#e6dbdd]  rounded-xl text-[#896168] font-semibold flex items-center justify-center gap-2 hover:bg-background-light transition-colors"
                        >
                          <PlusCircle size={20} />
                          Add Another Coupon
                        </button>
                      </div>
                    </section>

                    {/* Final Touches: Music & Email */}
                    <section className="bg-white p-4 md:p-8 rounded-xl border border-[#e6dbdd]  shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <Sliders className="text-primary" />
                        <h3 className="text-xl font-bold">
                          The Final Details
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700  ml-1">
                            Soundtrack
                          </label>
                          <div className="flex gap-3">
                            <select
                              name="music_id"
                              value={form.music_id}
                              onChange={handleChange}
                              className="flex-1 h-12 px-4 bg-[#fdfafb]  border border-gray-200  focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm outline-none transition-all appearance-none cursor-pointer"
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
                                  : "bg-white text-primary border border-primary/20"
                              }`}
                            >
                              {playMusic ? (
                                <Square className="fill-current" size={16} />
                              ) : (
                                <Play size={20} className="fill-current" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700  ml-1">
                            Your Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="w-full h-12 px-6 bg-[#fdfafb]  border border-gray-200  focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm outline-none transition-all"
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
                      <div className="bg-white p-4 md:p-8 rounded-[0.9rem] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Rocket className="text-primary" size={32} />
                          </div>
                          <div className="text-left">
                            <h4 className="text-xl font-extrabold">
                              Final Package
                            </h4>
                            <p className="text-sm text-[#896168]">
                              Live URL till Feb. 15th 2026 + All premium
                              features
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-black block text-primary">
                            ₦1,000
                          </span>
                          <span className="text-xs text-[#896168] uppercase tracking-tighter">
                            One-time payment
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pay Button Area */}
                    <div className="flex flex-col items-center gap-8 pt-4 pb-20">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-md py-5 bg-primary text-white text-lg font-black rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loading ? "Designing Magic..." : "Pay & Generate Link"}
                        <ArrowRight />
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
                        <p className="text-[10px] font-bold text-[#896168] flex items-center gap-1 uppercase tracking-[0.2em]">
                          <Lock size={12} />
                          Secured by Flutterwave
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={prevWizardStep}
                        className="text-[#896168] font-bold hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        Go back to edit
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Live Preview Sticky (Only for Step 2) */}
          {wizardStep === 2 && (
            <div className="lg:w-85 hidden lg:block">
              <div className="sticky top-32 flex flex-col gap-6">
                <div className="relative w-full aspect-9/16 bg-pink-50 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* Phone Interface Mock */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-full h-full bg-white/40 backdrop-blur-[2px] rounded-lg p-4 flex flex-col justify-center gap-4">
                      <div className="text-xs uppercase tracking-widest text-primary font-bold">
                        Preview
                      </div>
                      <h4 className="font-serif italic text-2xl text-[#181112] leading-tight">
                        "{form.intro_message || "To my Omalicha..."}"
                      </h4>
                      <div className="h-px w-12 bg-primary mx-auto"></div>
                      {/* Carousel Preview Mock */}
                      <div className="mt-8 relative overflow-hidden h-32 flex items-center justify-center">
                        <div className="w-full p-4 rounded-xl bg-white  shadow-sm border border-primary/10 transform -rotate-1">
                          <p className="text-[11px] text-gray-600  italic">
                            "
                            {form.reasons[0] ||
                              "The way you laugh at my dry jokes..."}
                            "
                          </p>
                          <div className="mt-2 flex justify-center gap-1">
                            <div className="size-1 bg-primary rounded-full"></div>
                            <div className="size-1 bg-primary/20 rounded-full"></div>
                            <div className="size-1 bg-primary/20 rounded-full"></div>
                          </div>
                        </div>
                        {/* Peek of next slide */}
                        <div className="absolute -right-20 opacity-30 transform rotate-2 w-full p-4 rounded-xl bg-white  border border-primary/10">
                          <p className="text-[11px]">Next reason...</p>
                        </div>
                      </div>
                    </div>
                    {/* Background Decoration */}
                    <div className="absolute top-10 right-10 text-primary/10 select-none">
                      <Heart size={100} />
                    </div>
                    <div className="absolute bottom-10 left-10 text-primary/10 select-none scale-x-[-1]">
                      <Heart size={100} />
                    </div>
                  </div>
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXFZ9-rDjAfO-C5gWSeRNodGDj8z7QYNY-fKn-K9cAsdY1qJ9Ojsc48yoj3-cz4svgkQYFBft7dDa07_COgfHdIyEZ5IVq_OBG29eSNtGxMEB2oRrrdjtckoRn9QkrhMFXQKg6rlcqOzAMtL3NzU66sJY3Y5IEKsvaNzG_iIdFgzri-C0uhFrhCmlcSwtuSadHHWI5zoSWsYUoQpALolQkAb99_lG3tgd1dcv62XLbBoD68PwdPv58tPNEYTYX2GYVgK_EJZR8OD4"
                    alt="Background"
                  />
                </div>
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-primary text-xl" />
                    <p className="text-xs text-[#896168]  leading-relaxed">
                      <strong>Tip:</strong> Women love sincerity! Try to mention
                      specific details about your relationship that only you two
                      know.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}         
        </main>
      </div>
    </ThemeWrapper>
  );
}
