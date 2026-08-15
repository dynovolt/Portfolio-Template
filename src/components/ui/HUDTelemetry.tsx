"use client";

import { useEffect, useState, useRef } from "react";

export default function HUDTelemetry() {
  const [activeSection, setActiveSection] = useState("HERO");
  const coordYRef = useRef<HTMLSpanElement>(null);
  const scrollPctTextRef = useRef<HTMLSpanElement>(null);
  const scrollProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Direct DOM scroll telemetry tracker (no React state re-renders on scroll)
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, Math.round((currentY / (docHeight || 1)) * 100)));

      if (coordYRef.current) {
        coordYRef.current.textContent = `${currentY.toString().padStart(4, "0")} PX`;
      }
      if (scrollPctTextRef.current) {
        scrollPctTextRef.current.textContent = `${pct.toString().padStart(3, "0")}%`;
      }
      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.height = `${pct}%`;
      }
    };

    // 2. Performant active section tracking via IntersectionObserver (no layout reflows on scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.toUpperCase());
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = ["hero", "about", "skills", "projects", "timeline", "testimonials", "blog", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Left HUD Panel */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-8 font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] pointer-events-none select-none">
        <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
          <span className="text-white/20 text-[8px]">system core</span>
          <span className="text-brand-blue font-semibold animate-pulse">SYS_READY_OK</span>
        </div>

        <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
          <span className="text-white/20 text-[8px]">telemetry anchor</span>
          <span className="text-white font-medium">[ {activeSection} ]</span>
        </div>

        <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
          <span className="text-white/20 text-[8px]">coordinate y</span>
          <span ref={coordYRef}>0000 PX</span>
        </div>
      </div>

      {/* Right HUD Panel */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-8 font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] pointer-events-none select-none">
        {/* Vertical Progress Line Container */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] text-white/20">depth</span>
          
          <div className="relative w-[1px] h-32 bg-white/10 rounded-full overflow-hidden">
            {/* Glowing progress line indicator */}
            <div
              ref={scrollProgressBarRef}
              style={{ height: "0%" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-blue to-brand-purple shadow-[0_0_8px_rgba(79,126,255,0.5)]"
            />
          </div>
          
          <span ref={scrollPctTextRef} className="text-white font-semibold">000%</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[7px] text-white/20">mesh_grid</span>
          <span className="text-brand-purple">ACTIVE</span>
        </div>
      </div>
    </>
  );
}
