"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setComplete(true);
        if (onComplete) onComplete();
      }
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span>
      {displayedText}
      {!complete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-6 bg-accent ml-1 align-middle"
        />
      )}
    </span>
  );
}
