"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Scale for high-DPI (Retina) displays
    const scale = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Mouse coordinates (scaled to device pixel ratio)
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 220 };

    // Mobile performance tuning: reduce particles & expand grid size
    const isMobile = width < 768;
    const particleCount = isMobile ? 15 : 45;
    const gridSize = isMobile ? 80 : 50;

    // Set up particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "197, 168, 128" : "230, 213, 195", // Gold or Champagne
      });
    }

    // Grid details
    let gridCols = Math.ceil(width / gridSize) + 1;
    let gridRows = Math.ceil(height / gridSize) + 1;

    // Pre-allocated grid points cache to avoid layout thrashing and GC overhead
    interface GridPoint {
      origX: number;
      origY: number;
      drawX: number;
      drawY: number;
      force: number;
    }
    
    let points: GridPoint[] = [];

    const initPoints = () => {
      points = [];
      for (let c = 0; c < gridCols; c++) {
        for (let r = 0; r < gridRows; r++) {
          points.push({
            origX: c * gridSize,
            origY: r * gridSize,
            drawX: c * gridSize,
            drawY: r * gridSize,
            force: 0,
          });
        }
      }
    };

    initPoints();

    // Track resizing
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
      
      gridCols = Math.ceil(width / gridSize) + 1;
      gridRows = Math.ceil(height / gridSize) + 1;
      initPoints();
    };
    window.addEventListener("resize", handleResize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(3, 3, 3, 1)";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // 1. Draw glowing background blobs
      const time = Date.now() * 0.0003;
      const blob1X = width * 0.25 + Math.sin(time) * 150;
      const blob1Y = height * 0.3 + Math.cos(time * 0.8) * 100;
      const blob2X = width * 0.75 + Math.cos(time * 0.9) * 120;
      const blob2Y = height * 0.7 + Math.sin(time * 1.1) * 150;

      // Blob 1 (Electric Blue equivalent -> Gold)
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 50, blob1X, blob1Y, 400);
      grad1.addColorStop(0, "rgba(197, 168, 128, 0.06)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(blob1X, blob1Y, 400, 0, Math.PI * 2);
      ctx.fill();

      // Blob 2 (Soft Purple equivalent -> Champagne)
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 50, blob2X, blob2Y, 450);
      grad2.addColorStop(0, "rgba(230, 213, 195, 0.05)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(blob2X, blob2Y, 450, 0, Math.PI * 2);
      ctx.fill();

      // Update grid point warp coordinates using distance-squared filtering
      const radiusSq = mouse.radius * mouse.radius;
      const mouseRadius = mouse.radius;
      const mX = mouse.x;
      const mY = mouse.y;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = p.origX - mX;
        const dy = p.origY - mY;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          p.drawX = p.origX + Math.cos(angle) * force * 15;
          p.drawY = p.origY + Math.sin(angle) * force * 15;
          p.force = force;
        } else {
          p.drawX = p.origX;
          p.drawY = p.origY;
          p.force = 0;
        }
      }

      // 2. Draw Math-based Warp Grid (Batched Lines drawing)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;

      // Draw all vertical column lines in one batch
      ctx.beginPath();
      for (let c = 0; c < gridCols; c++) {
        const startIdx = c * gridRows;
        if (startIdx < points.length) {
          ctx.moveTo(points[startIdx].drawX, points[startIdx].drawY);
          for (let r = 1; r < gridRows; r++) {
            const idx = startIdx + r;
            if (idx < points.length) {
              ctx.lineTo(points[idx].drawX, points[idx].drawY);
            }
          }
        }
      }
      ctx.stroke();

      // Draw all horizontal row lines in one batch
      ctx.beginPath();
      for (let r = 0; r < gridRows; r++) {
        if (r < points.length) {
          ctx.moveTo(points[r].drawX, points[r].drawY);
          for (let c = 1; c < gridCols; c++) {
            const idx = c * gridRows + r;
            if (idx < points.length) {
              ctx.lineTo(points[idx].drawX, points[idx].drawY);
            }
          }
        }
      }
      ctx.stroke();

      // 3. Draw grid dots with batched rendering
      // Batch draw standard/unwarped dots to save 90%+ of fill/stroke calls
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.force === 0) {
          ctx.moveTo(p.drawX + 1, p.drawY); // prevent lines from connecting dots
          ctx.arc(p.drawX, p.drawY, 1, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Draw only the hovered/warped dots individually
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.force > 0) {
          ctx.fillStyle = `rgba(197, 168, 128, ${0.05 + p.force * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.drawX, p.drawY, 1 + p.force * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = p.x - mX;
        const dy = p.y - mY;
        const distSq = dx * dx + dy * dy;

        let finalAlpha = p.alpha;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouseRadius - dist) / mouseRadius;
          finalAlpha = p.alpha + force * 0.4;
        }

        ctx.fillStyle = `rgba(${p.color}, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particle connections (single check per pair, and distance-squared filtered)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p1.x - p2.x;
          const pdy = p1.y - p2.y;
          const pdistSq = pdx * pdx + pdy * pdy;

          if (pdistSq < 10000) { // 100 * 100 = 10000
            const pdist = Math.sqrt(pdistSq);
            const alpha = ((100 - pdist) / 100) * 0.05;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-background pointer-events-none"
    />
  );
}
