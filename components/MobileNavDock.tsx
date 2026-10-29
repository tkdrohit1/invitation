"use client";

import React from "react";
import { Home, Calendar, MapPin, Sparkles, MessageSquareHeart } from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface MobileNavDockProps {
  onOpenEnvelope?: () => void;
}

export default function MobileNavDock({ onOpenEnvelope }: MobileNavDockProps) {
  const { t } = useLanguage();

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.85 },
      colors: ["#e8c98a", "#f5dfaa", "#ffffff", "#5c121e"],
    });
    if (onOpenEnvelope) {
      onOpenEnvelope();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Mobile Navigation Bar"
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-[320px] sm:max-w-sm rounded-full border border-[#e8c98a]/35 bg-gradient-to-r from-[#24050a]/95 via-[#380a11]/95 to-[#24050a]/95 px-5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(92,18,30,0.4)] backdrop-blur-xl"
      >
        {/* Top / Home */}
        <button
          onClick={() => scrollToSection("top")}
          className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#e8c98a] transition"
        >
          <Home className="h-4 w-4" />
          <span className="text-[9px] font-medium tracking-wider uppercase">{t.mobileNav.top}</span>
        </button>

        {/* Schedule */}
        <button
          onClick={() => scrollToSection("schedule")}
          className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#e8c98a] transition"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-[9px] font-medium tracking-wider uppercase">{t.mobileNav.events}</span>
        </button>

        {/* Center Floating Celebration Action Button */}
        <div className="-mt-7">
          <button
            onClick={triggerCelebration}
            title={t.mobileNav.celebrateTooltip}
            aria-label={t.mobileNav.celebrateTooltip}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#f5dfaa] bg-gradient-to-tr from-[#5c121e] via-[#851b2d] to-[#400b14] text-white shadow-[0_8px_25px_rgba(92,18,30,0.7),0_0_15px_rgba(232,201,138,0.5)] transition-all hover:scale-110 active:scale-95"
          >
            <span className="absolute -inset-1 rounded-full border border-[#e8c98a]/40 animate-ping opacity-60 pointer-events-none" />
            <Sparkles className="h-5 w-5 text-[#f5dfaa] group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Venue (Royal Garden) */}
        <button
          onClick={() => scrollToSection("venues")}
          className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#e8c98a] transition"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-[9px] font-medium tracking-wider uppercase">{t.mobileNav.venue}</span>
        </button>

        {/* Blessings */}
        <button
          onClick={() => scrollToSection("blessings")}
          className="flex flex-col items-center gap-0.5 text-[#e8c98a] hover:brightness-125 transition"
        >
          <MessageSquareHeart className="h-4 w-4" />
          <span className="text-[9px] font-bold tracking-wider uppercase">{t.mobileNav.blessings}</span>
        </button>
      </nav>
    </div>
  );
}
