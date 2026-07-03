import type { Metadata } from "next";
import "./globals.css";
import LenisScroller from "@/components/LenisScroller";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import GlobalOverlays from "@/components/GlobalOverlays";

export const metadata: Metadata = {
  title: "The July Issue | A Story of Us",
  description: "A digital magazine and storybook celebrating one extraordinary person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-[#B8925E]/30 selection:text-[#111111]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col relative text-[var(--foreground)] bg-[var(--background)]">
        
        {/* Cinematic Preloader */}
        <Preloader />

        {/* Global Textures (Film Grain, Paper, Vignette) */}
        <GlobalOverlays />

        {/* Smooth Scrolling Provider */}
        <LenisScroller />

        {/* Custom Luxury Cursor */}
        <CustomCursor />

        {/* Main Content Area */}
        <main className="flex-grow w-full relative z-10">
          {children}
        </main>

        {/* Floating global minimal music player */}
        <MusicPlayer />

      </body>
    </html>
  );
}
