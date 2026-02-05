import "./globals.css";

export const metadata = {
  title: "For Adebimpe 💖",
  description: "A tiny question, from my heart to yours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
