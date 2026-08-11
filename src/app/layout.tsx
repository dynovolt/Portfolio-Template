import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import ScrollProvider from "@/components/layout/ScrollProvider";
import CanvasBackground from "@/components/ui/CanvasBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import { portfolioConfig } from "@/config/portfolio";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioConfig.personalInfo.name} | ${portfolioConfig.personalInfo.title}`,
  description: `${portfolioConfig.personalInfo.name} — ${portfolioConfig.personalInfo.title}. ${portfolioConfig.personalInfo.bio}`,
  metadataBase: new URL("https://alexthorne.dev"),
  openGraph: {
    title: `${portfolioConfig.personalInfo.name} | ${portfolioConfig.personalInfo.title}`,
    description: portfolioConfig.personalInfo.bio,
    url: "https://alexthorne.dev",
    siteName: `${portfolioConfig.personalInfo.name} Portfolio`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${portfolioConfig.personalInfo.name} Portfolio Cover`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.personalInfo.name} | ${portfolioConfig.personalInfo.title}`,
    description: portfolioConfig.personalInfo.bio,
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-brand-blue selection:text-white min-h-screen flex flex-col">
        {/* Grain overlay for luxury visual texture */}
        <div className="noise-overlay" />
        
        {/* Particle and warped coordinate grid backdrop */}
        <CanvasBackground />
        
        {/* Interactive Mouse Follower */}
        <CustomCursor />
        
        {/* Keyboard shortcut navigator */}
        <CommandPalette />

        {/* Lenis Smooth Scroll Provider */}
        <ScrollProvider>
          <div className="flex flex-col min-h-screen relative z-10">
            {children}
          </div>
        </ScrollProvider>
      </body>
    </html>
  );
}
