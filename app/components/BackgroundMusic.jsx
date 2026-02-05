"use client";
import { Howl } from "howler";
import { useEffect } from "react";

const sound = new Howl({
  src: ["/music.mp3"],
  loop: true,
  volume: 0.3,
});

export default function BackgroundMusic() {
  useEffect(() => {
    // Try to play immediately (might be blocked by browser)
    const playSound = () => {
      if (!sound.playing()) {
        sound.play();
      }
    };

    // Add listeners for user interaction to start audio
    const handleInteraction = () => {
      playSound();
      // Remove listeners once audio starts
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    // Initial attempt
    playSound();

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return null; // No UI needed
}
