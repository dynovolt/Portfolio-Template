"use client";

import { useEffect, useState, useRef } from "react";

export default function ScrambleText({
  text,
  className = "",
  triggerOn = "hover", // 'hover' or 'mount'
}: {
  text: string;
  className?: string;
  triggerOn?: "hover" | "mount";
}) {
  const [displayedText, setDisplayedText] = useState(text);
  const isAnimating = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "!@#$%^&*()_+{}[];:<>?,./~1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const scramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let iterations = 0;
    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        isAnimating.current = false;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      iterations += 1 / 3; // Controls speed of resolution
    }, 25);
  };

  useEffect(() => {
    if (triggerOn === "mount") {
      scramble();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, triggerOn]);

  return (
    <span
      className={`font-mono inline-block cursor-default ${className}`}
      onMouseEnter={() => {
        if (triggerOn === "hover") scramble();
      }}
    >
      {displayedText}
    </span>
  );
}
