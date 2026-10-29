"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Heart, Menu, X, Globe } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.schedule, href: "#schedule" },
    { label: t.nav.venue, href: "#venues" },
    { label: t.nav.blessings, href: "#blessings" },
  ];

  const groomName = language === "hi" ? "दीपक" : weddingConfig.couple.groom.firstName;
  const brideName = language === "hi" ? "पूजा" : weddingConfig.couple.bride.firstName;
  const andWord = language === "hi" ? "संग" : "&";
  const monogram = language === "hi" ? "द&पू" : `${weddingConfig.couple.groom.firstName[0]}&${weddingConfig.couple.bride.firstName[0]}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#e8c98a]/20 bg-[#1a0407]/90 py-3 backdrop-blur-md shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Monogram Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 sm:gap-2.5 font-heading text-lg sm:text-xl font-bold tracking-widest text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8c98a]/50 bg-[#5c121e] text-[11px] sm:text-xs text-[#e8c98a] group-hover:scale-105 transition-transform">
            {monogram}
          </span>
          <span className="font-serif text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-[#e8c98a]">
            {groomName} {andWord} {brideName}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-[#e8c98a] hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Language Switcher, Venue Map & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            title={language === "en" ? "हिंदी में देखें" : "View in English"}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/40 bg-[#5c121e]/80 hover:bg-[#7a1928] px-3 py-1.5 text-xs font-semibold tracking-wider text-[#f5dfaa] transition-all hover:scale-105 shadow-sm active:scale-95"
          >
            <Globe className="h-3 w-3 text-[#e8c98a]" />
            <span>{t.nav.switchLang}</span>
          </button>

          <a
            href={weddingConfig.venues[0]?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=FM9M%2BCMG%2C+Manikpur%2C+Prayagraj%2C+Uttar+Pradesh+212208"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex group relative items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1105] shadow-md transition-all hover:brightness-110"
          >
            <Sparkles className="h-3 w-3" />
            <span>{t.nav.venueMapBtn}</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e8c98a]/20 bg-[#1a0407]/95 px-6 py-6 backdrop-blur-xl space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-[#e8c98a]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#e8c98a]/30 bg-[#5c121e]/70 px-4 py-2 text-xs font-medium text-[#f5dfaa]"
            >
              <Globe className="h-3.5 w-3.5 text-[#e8c98a]" />
              <span>{language === "en" ? "हिंदी में बदलें (Hindi)" : "Switch to English"}</span>
            </button>
            <a
              href={weddingConfig.venues[0]?.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] px-3.5 py-2 text-xs font-bold text-[#1a1105]"
            >
              <Sparkles className="h-3 w-3" />
              <span>{t.nav.venueMapBtn}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
