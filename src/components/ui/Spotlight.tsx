"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Spotlight({
  children,
  className = "",
  color = "rgba(79, 126, 255, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      rectRef.current = null;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }
    
    const rect = rectRef.current;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    rectRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Spotlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
