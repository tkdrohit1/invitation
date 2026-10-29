"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Sparkles, Calendar, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingConfig } from "@/config/wedding.config";
import { useLanguage } from "@/context/LanguageContext";

export default function ScratchDateCard() {
  const { t, language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  // Initialize Canvas with Gold Foil texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Metallic Gold Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#c89c4b");
    gradient.addColorStop(0.3, "#fbe8c7");
    gradient.addColorStop(0.6, "#d4af37");
    gradient.addColorStop(1, "#9c7225");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Foil text on top of the scratch layer
    ctx.font = language === "hi" ? "bold 13px sans-serif" : "bold 13px serif";
    ctx.fillStyle = "rgba(40, 25, 5, 0.75)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(t.scratchCard.canvasTopText, canvas.width / 2, canvas.height / 2 - 8);

    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(40, 25, 5, 0.55)";
    ctx.fillText(t.scratchCard.canvasSubText, canvas.width / 2, canvas.height / 2 + 14);
  }, [t, language]);

  useEffect(() => {
    if (!isScratched) {
      initCanvas();
    }
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas, isScratched]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkPercent();
  };

  const checkPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      // Sample every 16th pixel for performance
      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / (totalPixels / 16)) * 100);
      setScratchPercent(percent);

      if (percent > 40 && !isScratched) {
        setIsScratched(true);
        // Clean reveal
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#e8c98a", "#f5dfaa", "#ffffff", "#c89c4b"],
        });
      }
    } catch {
      // Cross-origin fallback
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#e8c98a]/35 bg-gradient-to-b from-[#5c121e]/90 via-[#2b060d]/95 to-[#140205]/95 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#e8c98a]" />
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#e8c98a]">
            {t.scratchCard.title}
          </span>
        </div>
        <div className="text-[11px] font-medium text-white/50">
          {isScratched ? (
            <span className="inline-flex items-center gap-1 text-[#e8c98a]">
              <CheckCircle2 className="h-3.5 w-3.5" /> {t.scratchCard.dateUnveiled}
            </span>
          ) : (
            <span>{t.scratchCard.scratchHint(scratchPercent)}</span>
          )}
        </div>
      </div>

      {/* Card Content & Canvas Box */}
      <div className="relative my-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e8c98a]/30 bg-gradient-to-br from-[#140205] via-[#420c15] to-[#011413] shadow-inner select-none flex flex-col items-center justify-center p-4">
        {/* Underlying Revealed Date Content */}
        <div className="text-center z-0">
          <p className="font-script text-2xl text-[#f5dfaa] mb-1">
            {t.scratchCard.revealedSubtitle}
          </p>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold tracking-widest text-white drop-shadow-md">
            {t.scratchCard.revealedDate}
          </div>
          <div className="mx-auto my-2 h-[1px] w-20 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
          <p className="font-serif text-sm tracking-wider uppercase text-[#e8c98a]">
            {t.scratchCard.revealedCity}
          </p>
        </div>

        {/* Scratchable Canvas Overlay */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 h-full w-full cursor-crosshair touch-none"
            onMouseDown={() => (isDrawing.current = true)}
            onMouseUp={() => (isDrawing.current = false)}
            onMouseLeave={() => (isDrawing.current = false)}
            onMouseMove={(e) => {
              if (isDrawing.current) {
                scratch(e.clientX, e.clientY);
              }
            }}
            onTouchStart={() => (isDrawing.current = true)}
            onTouchEnd={() => (isDrawing.current = false)}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                scratch(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
          />
        )}
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <span className="flex items-center gap-1.5 font-serif italic text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-[#e8c98a]" />
          {t.scratchCard.bottomHint}
        </span>
        <button
          onClick={() => {
            setIsScratched(true);
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            confetti({ particleCount: 40, spread: 60, colors: ["#e8c98a", "#ffffff"] });
          }}
          className="text-[11px] underline underline-offset-4 text-[#e8c98a]/80 hover:text-[#e8c98a] transition"
        >
          {isScratched ? t.scratchCard.revealedBtn : t.scratchCard.revealBtn}
        </button>
      </div>
    </div>
  );
}
