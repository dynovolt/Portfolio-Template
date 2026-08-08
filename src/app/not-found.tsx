"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import Magnetic from "@/components/ui/Magnetic";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030303] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />

      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        
        {/* Scrambled 404 header */}
        <h1 className="text-8xl sm:text-9xl font-display font-extrabold text-white tracking-tighter">
          <ScrambleText text="404" triggerOn="mount" />
        </h1>

        <h2 className="text-xl font-bold uppercase tracking-wider text-white/80">
          Lost in orbit
        </h2>

        <p className="text-white/40 text-sm font-light leading-relaxed">
          The coordinate you are looking for has drifted into the dark or never existed. Let&rsquo;s bring you back home.
        </p>

        <div className="mt-4">
          <Magnetic range={25}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-white/5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
