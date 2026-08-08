"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import InfiniteMarquee from "../ui/InfiniteMarquee";

export default function Testimonials() {
  const testimonials = portfolioConfig.testimonials;

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden w-full">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-4 mb-14 md:mb-18">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">05 / Endorsements</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
        >
          Kind Words
        </motion.h2>
      </div>

      {/* Infinite loop list */}
      <div className="relative py-4 flex flex-col gap-6">
        <InfiniteMarquee speed={35} direction="left">
          {testimonials.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="glass-card w-[350px] md:w-[420px] p-6 md:p-8 rounded-2xl flex flex-col justify-between gap-6 md:gap-8 flex-shrink-0"
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-brand-blue">
                  <Quote className="w-4 h-4" />
                </div>
                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white tracking-wide">{t.name}</span>
                  <span className="text-[10px] text-white/40 font-medium">
                    {t.role} &bull; <span className="text-brand-blue">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
