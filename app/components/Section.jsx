"use client";
import { motion } from "framer-motion";

export default function Section({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="glass p-8 rounded-3xl max-w-lg w-full text-center flex flex-col items-center gap-6"
    >
      {children}
    </motion.section>
  );
}
