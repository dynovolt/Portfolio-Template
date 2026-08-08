"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

export default function StatCounter({
  value,
  duration = 2.5,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    const node = ref.current;
    
    // Animate from 0 to value
    const controls = animate(0, value, {
      duration: duration,
      ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
      onUpdate(current) {
        node.textContent = Math.floor(current).toString();
      },
    });

    return () => controls.stop();
  }, [value, inView, duration]);

  return (
    <span className="font-display tabular-nums tracking-tight">
      <span ref={ref}>0</span>
      {suffix && <span className="text-brand-blue ml-0.5">{suffix}</span>}
    </span>
  );
}
