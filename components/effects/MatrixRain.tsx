'use client';

import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&研究論文';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient from bright to dim
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.8) {
          ctx.fillStyle = '#4ade80';
        } else {
          ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + brightness * 0.4})`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Slow down the animation
    let lastTime = 0;
    const throttledDraw = (time: number) => {
      if (time - lastTime > 50) {
        lastTime = time;
        ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const brightness = Math.random();
          if (brightness > 0.95) {
            ctx.fillStyle = '#ffffff';
          } else if (brightness > 0.8) {
            ctx.fillStyle = '#4ade80';
          } else {
            ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + brightness * 0.4})`;
          }
          ctx.fillText(char, x, y);
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.5;
        }
      }
      animationRef.current = requestAnimationFrame(throttledDraw);
    };

    animationRef.current = requestAnimationFrame(throttledDraw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.15 }}
    />
  );
};

export default MatrixRain;
