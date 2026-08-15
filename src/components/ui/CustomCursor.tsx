"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [hoverType, setHoverType] = useState<"none" | "link" | "project">("none");
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring configuration (slower, smooth follow)
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  // Inner dot spring configuration (faster, immediate follow)
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 450 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 450 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Listen to hover events for interactable items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectCard = target.closest("[data-cursor='project']");
      const isInteractable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.classList.contains("interactive") ||
        target.closest(".interactive") !== null;

      if (projectCard) {
        setHoverType("project");
      } else if (isInteractable) {
        setHoverType("link");
      } else {
        setHoverType("none");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  // Hide cursor on touch devices or if reduced motion is requested
  if (shouldReduceMotion) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/20 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: hoverType === "project" ? "normal" : "difference",
        }}
        animate={{
          scale: hoverType === "project" ? 1.6 : hoverType === "link" ? 1.3 : clicked ? 0.85 : 1,
          backgroundColor: hoverType === "project" ? "rgba(197, 168, 128, 1)" : "rgba(255, 255, 255, 0)",
          borderColor: hoverType === "project" ? "rgba(197, 168, 128, 1)" : hoverType === "link" ? "rgba(197, 168, 128, 0.4)" : "rgba(255, 255, 255, 0.2)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <AnimatePresence>
          {hoverType === "project" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] font-mono font-bold tracking-[0.1em] text-black"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-blue pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverType === "project" ? 0 : hoverType === "link" ? 0.4 : clicked ? 0.6 : 1,
          opacity: isVisible && hoverType !== "project" ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />

      {/* Cursor spotlight behind elements for modern luxury glowing feels */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[-5] bg-gradient-radial from-brand-blue/8 to-transparent blur-3xl opacity-0 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0.3 }}
      />
    </>
  );
}
