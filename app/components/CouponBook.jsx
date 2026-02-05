"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const coupons = [
  {
    id: 1,
    title: "Breakfast in Bed",
    icon: "☕",
    desc: "Your favorite morning treats, served right to you.",
  },
  {
    id: 2,
    title: "Cozy Movie Marathon",
    icon: "🎬",
    desc: "Blankets, popcorn, and every movie you choose.",
  },
  {
    id: 3,
    title: "Massage",
    icon: "💆‍♀️",
    desc: "A relaxing session to melt away all your stress.",
  },
  {
    id: 4,
    title: "Infinite Hugs",
    icon: "🫂",
    desc: "A whole day of warm, cozy embraces whenever you want.",
  },
  {
    id: 5,
    title: "Indoor Picnic",
    icon: "🍔",
    desc: "Living room floor, fairy lights, and all your favorite snacks.",
  },
  {
    id: 6,
    title: "Game Night",
    icon: "🎮",
    desc: "Playing your favorite games together all night long.",
  },
];

export default function CouponBook() {
  const [claimed, setClaimed] = useState([]);

  const toggleClaim = (id) => {
    if (claimed.includes(id)) {
      setClaimed(claimed.filter((i) => i !== id));
    } else {
      setClaimed([...claimed, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6 max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
      {coupons.map((coupon) => (
        <motion.div
          key={coupon.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleClaim(coupon.id)}
          className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            claimed.includes(coupon.id)
              ? "bg-accent/10 border-accent/40 opacity-80"
              : "bg-white border-accent/10 hover:border-accent/30 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">{coupon.icon}</span>
            <div className="text-left">
              <h3 className="font-bold text-foreground">{coupon.title}</h3>
              <p className="text-xs text-foreground/60">{coupon.desc}</p>
            </div>
          </div>

          <AnimatePresence>
            {claimed.includes(coupon.id) && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] rounded-2xl pointer-events-none"
              >
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform -rotate-12 border-2 border-white">
                  REDEEMED 💖
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
