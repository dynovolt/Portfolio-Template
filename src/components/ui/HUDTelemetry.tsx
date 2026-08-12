"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function HUDTelemetry() {
  const [activeSection, setActiveSection] = useState("HERO");
  const [scrollPct, setScrollPct] = useState(0);
  const [coordY, setCoordY] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setCoordY(Math.round(currentY));

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, Math.round((currentY / (docHeight || 1)) * 100)));
      setScrollPct(pct);

      // Simple boundary checking for active telemetry section
      const sections = ["hero", "about", "skills", "projects", "timeline", "testimonials", "blog", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section occupies the center 40% of the viewport
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(section.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
          <span>{coordY.toString().padStart(4, "0")} PX</span>
        </div>
      </div>

      {/* Right HUD Panel */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-8 font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] pointer-events-none select-none">
        {/* Vertical Progress Line Container */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] text-white/20">depth</span>
          
          <div className="relative w-[1px] h-32 bg-white/10 rounded-full overflow-hidden">
            {/* Glowing progress line indicator */}
            <motion.div
              style={{
                height: `${scrollPct}%`,
              }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-blue to-brand-purple shadow-[0_0_8px_rgba(79,126,255,0.5)]"
            />
          </div>
          
          <span className="text-white font-semibold">{scrollPct.toString().padStart(3, "0")}%</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[7px] text-white/20">mesh_grid</span>
          <span className="text-brand-purple">ACTIVE</span>
        </div>
      </div>
    </>
  );
}
