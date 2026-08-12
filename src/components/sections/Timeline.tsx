"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import ScrollReveal from "../ui/ScrollReveal";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const experiences = portfolioConfig.experience;
  const education = portfolioConfig.education;

  // Track scroll inside the timeline container for active path drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <div className="flex flex-col gap-4 mb-16 md:mb-20">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">03 / Experience &amp; Education</span>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="clip-wipe" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            My Journey
          </h2>
        </ScrollReveal>
      </div>

      <div ref={containerRef} className="relative pl-6 md:pl-10 ml-2 md:ml-4">
        {/* Central timeline background track */}
        <div className="absolute left-0 top-1 w-[1px] h-full bg-white/10" />
        
        {/* Animated colored progress line */}
        <motion.div
          style={{ height: pathHeight }}
          className="absolute left-0 top-1 w-[1px] bg-gradient-to-b from-brand-blue via-brand-purple to-transparent origin-top"
        />

        {/* Experience Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 -ml-[31px] md:-ml-[43px] mb-8 z-10 relative">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#030303] border border-white/20 flex items-center justify-center text-white/80">
              <Briefcase className="w-3.5 h-3.5 md:w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-white">Work Experience</h3>
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <ScrollReveal
                key={`${exp.company}-${exp.role}`}
                variant="clip-wipe"
                delay={idx * 0.1}
                className="relative"
              >
                {/* Timeline node point */}
                <div className="absolute -left-[31px] md:-left-[43px] top-1.5 w-2 h-2 rounded-full bg-brand-blue border border-[#030303]" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-semibold text-lg text-white leading-snug">{exp.role}</h4>
                    <p className="text-white/60 text-sm font-medium tracking-wide">
                      {exp.company} &bull; <span className="text-white/40">{exp.location}</span>
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/[0.01] text-xs font-mono font-medium text-white/50 w-fit">
                    {exp.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-6 text-sm text-white/60 font-light leading-relaxed pl-4 list-disc marker:text-brand-blue">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                {/* Tech tags used in this job */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded border border-white/5 bg-white/[0.01] text-[10px] font-semibold uppercase tracking-wider text-white/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 -ml-[31px] md:-ml-[43px] mb-8 z-10 relative">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#030303] border border-white/20 flex items-center justify-center text-white/80">
              <GraduationCap className="w-3.5 h-3.5 md:w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-white">Education</h3>
          </div>

          <div className="flex flex-col gap-12">
            {education.map((edu, idx) => (
              <ScrollReveal
                key={edu.institution}
                variant="clip-wipe"
                delay={idx * 0.1}
                className="relative"
              >
                {/* Timeline node point */}
                <div className="absolute -left-[31px] md:-left-[43px] top-1.5 w-2 h-2 rounded-full bg-brand-purple border border-[#030303]" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-semibold text-lg text-white leading-snug">{edu.degree}</h4>
                    <p className="text-white/60 text-sm font-medium">{edu.institution}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/[0.01] text-xs font-mono font-medium text-white/50 w-fit">
                    {edu.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2 text-sm text-white/60 font-light leading-relaxed pl-4 list-disc marker:text-brand-purple">
                  {edu.achievements.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
