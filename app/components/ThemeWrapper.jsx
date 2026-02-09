"use client";

import { useMemo } from "react";

const themes = {
  classic: {
    "--background": "#fdf8f8",
    "--foreground": "#181112",
    "--accent": "#ee2b4b",
    "--accent-soft": "#ffb3c1",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(238, 43, 75, 0.1)",
    background: "linear-gradient(135deg, #fdf8f8 0%, #ffeef2 100%)",
  },
  midnight: {
    "--background": "#1a0b0d",
    "--foreground": "#ffffff",
    "--accent": "#ee2b4b",
    "--accent-soft": "#9d174d",
    "--card-bg": "#2a1619",
    "--border-color": "rgba(255, 255, 255, 0.1)",
    background: "linear-gradient(135deg, #1a0b0d 0%, #000000 100%)",
  },
  sunset: {
    "--background": "#fffcf9",
    "--foreground": "#181112",
    "--accent": "#f97316",
    "--accent-soft": "#fdba74",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(249, 115, 22, 0.1)",
    background: "linear-gradient(135deg, #fffcf9 0%, #fff1e6 100%)",
  },
  ocean: {
    "--background": "#f0fdfa",
    "--foreground": "#181112",
    "--accent": "#0d9488",
    "--accent-soft": "#99f6e4",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(13, 148, 136, 0.1)",
    background: "linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)",
  },
};

export default function ThemeWrapper({ theme = "classic", children }) {
  const activeTheme = themes[theme] || themes.classic;

  const style = useMemo(
    () => ({
      ...activeTheme,
      minHeight: "100vh",
      width: "100%",
      transition: "all 0.5s ease",
    }),
    [activeTheme],
  );

  return (
    <div style={style} className="theme-container">
      {children}
    </div>
  );
}
