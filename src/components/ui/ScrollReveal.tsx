"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "clip-wipe" | "perspective-3d" | "blur-in";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
}: ScrollRevealProps) {
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    "clip-wipe": {
      hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 15 },
      visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0 },
    },
    "perspective-3d": {
      hidden: { opacity: 0, rotateX: 20, transformPerspective: 1000, y: 40 },
      visible: { opacity: 1, rotateX: 0, transformPerspective: 1000, y: 0 },
    },
    "blur-in": {
      hidden: { opacity: 0, filter: "blur(12px)", scale: 0.96 },
      visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
