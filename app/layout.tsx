// app/layout.tsx
import "./globals.css";
import { Sora } from "next/font/google";
import type { Metadata } from "next";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200","300", "400", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Aarav Agrawal",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* expose the CSS var to your app */}
      <body className={sora.variable}>{children}</body>
    </html>
  );
}
