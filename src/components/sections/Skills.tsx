"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";

const categories = ["All", "Frontend", "Backend", "AI", "Cloud", "Database", "DevOps", "Languages"] as const;
type Category = typeof categories[number];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const skills = portfolioConfig.skills;

  const filteredSkills = skills.filter((skill) =>
    activeCategory === "All" ? true : skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="flex flex-col gap-4 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">02 / Tech Stack</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
        >
          Technologies &amp; Toolkit
        </motion.h2>
      </div>

      {/* Categories Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-2.5 mb-10 md:mb-14 pb-4 border-b border-white/5 overflow-x-auto scrollbar-none"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-white/60 hover:text-white transition-all flex-shrink-0"
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-white text-black rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-black mix-blend-exclusion" : ""}`}>
                {cat}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Grid of Skills */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              key={skill.name}
              className="glass-card p-5 md:p-6 flex flex-col justify-between gap-4 h-32"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-white tracking-wide">{skill.name}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-semibold">
                  {skill.category}
                </span>
              </div>

              {/* Progress gauge bar */}
              <div className="w-full flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-white/40 font-mono">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
