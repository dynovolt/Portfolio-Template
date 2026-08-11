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
        color: Math.random() > 0.5 ? "79, 126, 255" : "139, 92, 246", // Blue or Purple
      });
    }

    // Grid details
    let gridCols = Math.ceil(width / gridSize) + 1;
    let gridRows = Math.ceil(height / gridSize) + 1;

    // Track resizing
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
      
      gridCols = Math.ceil(width / gridSize) + 1;
      gridRows = Math.ceil(height / gridSize) + 1;
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

      // Blob 1 (Electric Blue)
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 50, blob1X, blob1Y, 400);
      grad1.addColorStop(0, "rgba(79, 126, 255, 0.06)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(blob1X, blob1Y, 400, 0, Math.PI * 2);
      ctx.fill();

      // Blob 2 (Soft Purple)
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 50, blob2X, blob2Y, 450);
      grad2.addColorStop(0, "rgba(139, 92, 246, 0.05)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(blob2X, blob2Y, 450, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Math-based Warp Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;

      for (let c = 0; c < gridCols; c++) {
        ctx.beginPath();
        for (let r = 0; r < gridRows; r++) {
          const origX = c * gridSize;
          const origY = r * gridSize;

          // Compute distance to mouse
          const dx = origX - mouse.x;
          const dy = origY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = origX;
          let drawY = origY;

          // Grid warp formula (push vectors away slightly based on distance)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Distort away from mouse
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * force * 15;
            drawY += Math.sin(angle) * force * 15;
          }

          if (r === 0) {
            ctx.moveTo(drawX, drawY);
          } else {
            ctx.lineTo(drawX, drawY);
          }
        }
        ctx.stroke();
      }

      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const origX = c * gridSize;
          const origY = r * gridSize;

          // Compute distance to mouse
          const dx = origX - mouse.x;
          const dy = origY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = origX;
          let drawY = origY;

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * force * 15;
            drawY += Math.sin(angle) * force * 15;
          }

          if (c === 0) {
            ctx.moveTo(drawX, drawY);
          } else {
            ctx.lineTo(drawX, drawY);
          }
        }
        ctx.stroke();
      }

      // 3. Draw grid dots with cursor hover highlighting
      for (let c = 0; c < gridCols; c++) {
        for (let r = 0; r < gridRows; r++) {
          const origX = c * gridSize;
          const origY = r * gridSize;

          const dx = origX - mouse.x;
          const dy = origY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = origX;
          let drawY = origY;
          let dotColor = "rgba(255, 255, 255, 0.05)";
          let dotSize = 1;

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * force * 15;
            drawY += Math.sin(angle) * force * 15;
            
            // Intensify color & size based on proximity
            dotColor = `rgba(79, 126, 255, ${0.05 + force * 0.35})`;
            dotSize = 1 + force * 1.5;
          }

          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Proximity calculation for glow lines to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let finalAlpha = p.alpha;
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          finalAlpha = p.alpha + force * 0.4;
        }

        ctx.fillStyle = `rgba(${p.color}, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections for close particles
        particles.forEach((p2) => {
          if (p === p2) return;
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 100) {
            const alpha = (100 - pdist) / 100 * 0.05;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

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
