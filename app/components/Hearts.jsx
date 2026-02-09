"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const particleTypes = {
  hearts: ["💖", "💗", "💓", "💝", "💕"],
  stars: ["✨", "⭐", "🌟", "💫", "🌠"],
  petals: ["🌸", "🌹", "🌷", "🌻", "🌺"],
};

export default function Hearts({ type = "hearts" }) {
  const particles = useMemo(() => {
    const chars = particleTypes[type] || particleTypes.hearts;
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      size: Math.random() * (24 - 12) + 12,
      left: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * (15 - 5) + 5,
      delay: Math.random() * 5,
    }));
  }, [type]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: "110vh",
            x: `${p.left}vw`,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y: "-10vh",
            x: [`${p.left}vw`, `${p.left + (Math.random() * 10 - 5)}vw`],
            rotate: [0, 360],
            scale: [0.5, 1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            fontSize: `${p.size}px`,
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
}
