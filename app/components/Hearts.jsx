"use client";
import { motion } from "framer-motion";

const hearts = [
  { id: 1, left: "10%", delay: 0, scale: 1 },
  { id: 2, left: "30%", delay: 2, scale: 0.8 },
  { id: 3, left: "50%", delay: 4, scale: 1.2 },
  { id: 4, left: "70%", delay: 1, scale: 0.9 },
  { id: 5, left: "90%", delay: 3, scale: 1.1 },
];

export default function Hearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.3, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{ left: heart.left, scale: heart.scale }}
          className="absolute text-5xl"
        >
          {["💖", "💗", "💓", "💕"][heart.id % 4]}
        </motion.div>
      ))}
    </div>
  );
}
