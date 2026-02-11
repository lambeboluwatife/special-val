"use client";

import { useMemo } from "react";

const themes = {
  classic: {
    "--background": "#fdf8f8",
    "--foreground": "#181112",
    "--primary": "#ee2b4b",
    "--accent": "#ee2b4b",
    "--accent-soft": "#ffb3c1",
    "--accent-deep": "#c9184a",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(238, 43, 75, 0.1)",
    background: "linear-gradient(135deg, #fdf8f8 0%, #ffeef2 100%)",
  },
  midnight: {
    "--background": "#0f172a",
    "--foreground": "#ffffff",
    "--primary": "#be123c",
    "--accent": "#be123c",
    "--accent-soft": "#9d174d",
    "--accent-deep": "#881337",
    "--card-bg": "#1e293b",
    "--border-color": "rgba(255, 255, 255, 0.1)",
    background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
  },
  sunset: {
    "--background": "#fffcf9",
    "--foreground": "#181112",
    "--primary": "#f97316",
    "--accent": "#f97316",
    "--accent-soft": "#fdba74",
    "--accent-deep": "#c2410c",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(249, 115, 22, 0.1)",
    background: "linear-gradient(135deg, #fffcf9 0%, #fff1e6 100%)",
  },
  ocean: {
    "--background": "#f0fdfa",
    "--foreground": "#181112",
    "--primary": "#0d9488",
    "--accent": "#0d9488",
    "--accent-soft": "#99f6e4",
    "--accent-deep": "#0f766e",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(13, 148, 136, 0.1)",
    background: "linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)",
  },
  rose: {
    "--background": "#fff1f2",
    "--foreground": "#881337",
    "--primary": "#e11d48",
    "--accent": "#e11d48",
    "--accent-soft": "#fecdd3",
    "--accent-deep": "#9f1239",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(225, 29, 72, 0.1)",
    background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
  },
  lavender: {
    "--background": "#fdf4ff",
    "--foreground": "#581c87",
    "--primary": "#9333ea",
    "--accent": "#9333ea",
    "--accent-soft": "#e9d5ff",
    "--accent-deep": "#6b21a8",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(147, 51, 234, 0.1)",
    background: "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)",
  },
  golden: {
    "--background": "#fffbeb",
    "--foreground": "#78350f",
    "--primary": "#d97706",
    "--accent": "#d97706",
    "--accent-soft": "#fde68a",
    "--accent-deep": "#b45309",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(217, 119, 6, 0.1)",
    background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  },
  berry: {
    "--background": "#fdf2f8",
    "--foreground": "#831843",
    "--primary": "#db2777",
    "--accent": "#db2777",
    "--accent-soft": "#fbcfe8",
    "--accent-deep": "#9d174d",
    "--card-bg": "#ffffff",
    "--border-color": "rgba(219, 39, 119, 0.1)",
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
  },
};

const isHex = (str) => /^#([0-9A-F]{3}){1,2}$/i.test(str);

export default function ThemeWrapper({ theme = "classic", children }) {
  let activeTheme = themes[theme] || themes.classic;

  if (theme && isHex(theme)) {
    activeTheme = {
      "--background": "#ffffff",
      "--foreground": "#181112",
      "--primary": theme,
      "--accent": theme,
      "--accent-soft": `${theme}80`, // 50% opacity approximation
      "--accent-deep": theme, // Same for now
      "--card-bg": "#ffffff",
      "--border-color": `${theme}20`,
      background: `linear-gradient(135deg, #ffffff 0%, ${theme}10 100%)`,
    };
  }

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
