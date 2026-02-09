import "./globals.css";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata = {
  title: {
    default: "Valentine's Surprise 💖",
    template: "%s | Valentine's Surprise",
  },
  description:
    "Create and share a beautiful, personalized Valentine's Day surprise.",
  keywords: ["valentine", "love", "surprise", "gift", "personalized"],
  authors: [{ name: "Bolu" }],
  openGraph: {
    title: "Valentine's Surprise 💖",
    description:
      "Create and share a beautiful, personalized Valentine's Day surprise.",
    url: "https://special-val.vercel.app", // Replace with actual URL if known
    siteName: "Valentine's Surprise",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image exists or will be added
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine's Surprise 💖",
    description:
      "Create and share a beautiful, personalized Valentine's Day surprise.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-[#181112] dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
