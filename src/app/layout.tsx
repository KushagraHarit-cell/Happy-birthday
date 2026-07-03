import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import CursorConstellation from "@/components/CursorConstellation";
import MusicPlayer from "@/components/MusicPlayer";
import LenisScroller from "@/components/LenisScroller";
import KeyboardShortcutListener from "@/components/KeyboardShortcutListener";

export const metadata: Metadata = {
  title: "29 Days Until You | A Birthday Countdown Gift",
  description: "An interactive digital world dedicated to you, unlocking week by week until July 29.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-pink-500/30 selection:text-pink-200">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col relative text-[#2d141c] bg-[#fdfbfb]">
        {/* Smooth Scrolling Provider */}
        <LenisScroller />

        {/* Global Keyboard Shortcut listener */}
        <KeyboardShortcutListener />

        {/* Global Background Particles & Glows */}
        <BackgroundEffects />

        {/* Constellation Cursor Canvas */}
        <CursorConstellation />

        {/* Sticky Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow w-full relative z-10">
          {children}
        </main>

        {/* Floating global lo-fi music deck */}
        <MusicPlayer />

        {/* Ambient footer */}
        <footer className="py-8 text-center text-xs text-gray-500 relative z-10 select-none">
          <p>© 2026. Made with 💖 for my favorite person.</p>
        </footer>
      </body>
    </html>
  );
}
