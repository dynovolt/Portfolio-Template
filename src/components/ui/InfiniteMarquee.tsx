"use client";

import React from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  const xTranslation = direction === "left" ? [0, "-50%"] : ["-50%", 0];

  return (
    <div className={`overflow-hidden flex flex-row w-full mask-marquee ${className}`}>
      <motion.div
        className="flex flex-row whitespace-nowrap gap-6 w-max"
        animate={{
          x: xTranslation,
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {/* Render items twice to build a continuous illusion */}
        <div className="flex items-center gap-6">{children}</div>
        <div className="flex items-center gap-6">{children}</div>
      </motion.div>
    </div>
  );
}
