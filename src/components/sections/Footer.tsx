"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import Magnetic from "../ui/Magnetic";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { name, socials } = portfolioConfig.personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#030303] pt-16 md:pt-24 pb-12 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Top footer row: columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Column 1: Slogan */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-display font-bold text-lg text-white">Alex Thorne</span>
            <p className="text-white/45 text-sm font-light max-w-xs leading-relaxed">
              Designing interfaces that feel expensive and building backends that scale.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Navigation</span>
            <div className="flex flex-col gap-2.5 text-sm font-medium">
              <a href={isHome ? "#about" : "/#about"} className="text-white/60 hover:text-white transition-colors w-fit">About</a>
              <a href={isHome ? "#projects" : "/#projects"} className="text-white/60 hover:text-white transition-colors w-fit">Projects</a>
              <a href={isHome ? "#timeline" : "/#timeline"} className="text-white/60 hover:text-white transition-colors w-fit">Timeline</a>
              <a href={isHome ? "#blog" : "/#blog"} className="text-white/60 hover:text-white transition-colors w-fit">Blog</a>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Connect</span>
            <div className="flex flex-col gap-2.5 text-sm font-medium">
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              )}
              {socials.email && (
                <a href={`mailto:${socials.email}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 4: Back to top button */}
          <div className="md:col-span-1 flex justify-end items-start">
            <Magnetic range={30}>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] text-white flex items-center justify-center transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Dynamic Massive Typo Branding Accent (Apple/Framer/Vercel style footer branding) */}
        <div className="relative select-none pointer-events-none overflow-hidden h-24 md:h-44 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.03, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-[8rem] md:text-[18rem] text-white tracking-tighter uppercase leading-none whitespace-nowrap absolute"
          >
            {name}
          </motion.div>
        </div>

        {/* Bottom row: copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
          <div className="flex gap-4 font-mono">
            <span>Awwwards Nomination Template v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
