"use client";
import { Howl } from "howler";
import { useEffect, useRef } from "react";

const tracks = {
  classic: "/classical.mp3",
  love_romantic: "/love_romantic.mp3",
  romantic_adventure: "/romantic_adventure.mp3",
  romantic_piano: "/romantic_piano.mp3",
  romantic_dreams: "/romantic_dreams.mp3",
};

export default function BackgroundMusic({ trackId = "classic" }) {
  const soundRef = useRef(null);

  useEffect(() => {
    const src = tracks[trackId] || tracks.classic;

    // Cleanup previous sound if it exists
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0.3,
      html5: true, // Use HTML5 audio for potentially long files/streaming
    });

    const playSound = () => {
      if (soundRef.current && !soundRef.current.playing()) {
        soundRef.current.play();
      }
    };

    const handleInteraction = () => {
      playSound();
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
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, [trackId]);

  return null;
}
