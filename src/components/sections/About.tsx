"use client";

import { ArrowDown } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import StatCounter from "../ui/StatCounter";
import Magnetic from "../ui/Magnetic";
import TiltCard from "../ui/TiltCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function About() {
  const { bio, stats, resumeUrl } = portfolioConfig.personalInfo;

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Left Side: Text Introduction */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">01 / About Me</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="clip-wipe" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Engineering interfaces with pixel precision and building scalable backends.
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="blur-in" delay={0.2}>
            <p className="text-white/60 text-base md:text-lg font-light leading-relaxed tracking-wide">
              {bio}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <div className="mt-4">
              <Magnetic range={30}>
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 hover:border-white/20 rounded-full hover:bg-white/[0.02] transition-colors"
                >
                  <span>Download Resume</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Statistics Grid */}
        <div className="lg:col-span-5 w-full grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={stat.label}
              variant="perspective-3d"
              delay={idx * 0.1}
            >
              <TiltCard className="p-6 md:p-8 flex flex-col justify-between h-40 md:h-44">
                <span className="text-3xl md:text-5xl font-bold font-display text-white">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-white/40 text-xs md:text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
