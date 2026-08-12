"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import Magnetic from "../ui/Magnetic";
import ScrambleText from "../ui/ScrambleText";

export default function Hero() {
  const { greeting, title, subtitle } = portfolioConfig.personalInfo;
  
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);
  const yOrb = useTransform(scrollY, [0, 600], [0, -120]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden py-24 md:py-0"
    >
      {/* Subtle glow orb */}
      <motion.div 
        style={{ y: yOrb }}
        className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" 
      />

      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="max-w-4xl w-full text-center flex flex-col items-center gap-8 md:gap-10"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-xs font-semibold text-white/60 tracking-wider uppercase inline-flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
          <span>Available for Roles & consulting</span>
        </motion.div>

        {/* Greeting / Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-sm font-semibold tracking-widest text-brand-blue uppercase font-mono"
        >
          <ScrambleText text={greeting} triggerOn="mount" />
        </motion.p>

        {/* Main H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight text-white leading-[1.05]"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl text-white/50 max-w-2xl font-light tracking-wide leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <Magnetic range={40}>
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 w-48 sm:w-auto px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black bg-white rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-white/5"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </Magnetic>

          <Magnetic range={40}>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-48 sm:w-auto px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/10 hover:border-white/20 rounded-full hover:bg-white/[0.02] transition-all"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold font-mono text-white/40">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-3 bg-white/40 rounded-full"
        />
      </motion.div>
    </section>
  );
}
