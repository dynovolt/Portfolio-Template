"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12, // Maximum rotation in degrees
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for normalized coordinates (-0.5 to 0.5)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for tilt
  const springX = useSpring(x, { damping: 25, stiffness: 150 });
  const springY = useSpring(y, { damping: 25, stiffness: 150 });

  // Transforms to convert coordinates to rotation degrees
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  // Transform for cursor spotlight position on the card surface
  const spotlightX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${spotlightX} ${spotlightY}, rgba(79, 126, 255, 0.08), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative coordinates of mouse on element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates to 0 - 1 range
    const normX = mouseX / width;
    const normY = mouseY / height;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Reset to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${
        hovered ? "shadow-2xl shadow-brand-blue/5 border-white/10 bg-white/[0.03]" : ""
      } ${className}`}
    >
      {/* 3D Depth wrapper */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </div>

      {/* Dynamic Cursor Spotlight Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-screen z-10"
        style={{
          background: spotlightBg,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
