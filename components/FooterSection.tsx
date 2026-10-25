"use client";

import React from "react";
import Link from "next/link";
import { Heart, Lock, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-[#120204] py-16 px-6 text-center text-white/60">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e8c98a]/50 bg-[#5c121e] text-[#e8c98a] shadow-[0_0_20px_rgba(232,201,138,0.2)] mb-4">
          <span className="font-heading text-lg font-bold">
            {weddingConfig.couple.groom.firstName[0]}&{weddingConfig.couple.bride.firstName[0]}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold text-white mb-1">
          {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
        </h3>
        <p className="font-serif italic text-sm text-[#e8c98a] mb-6">
          {weddingConfig.couple.hashtag}
        </p>

        <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <span>{weddingConfig.couple.displayDate}</span>
          <span>•</span>
          <span>{weddingConfig.couple.city}</span>
        </div>

        <p className="font-serif text-xs text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
          Made with love to celebrate our journey with our cherished family and friends.
        </p>

        {/* Admin Portal Link */}
        <div className="pt-6 border-t border-white/5 w-full flex items-center justify-between text-[11px] text-white/40">
          <span>© 2026 {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#e8c98a] transition"
          >
            <Lock className="h-3 w-3" />
            <span>Organizer Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
