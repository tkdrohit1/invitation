"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Heart, Menu, X } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Schedule", href: "#schedule" },
    { label: "Royal Garden Venue", href: "#venues" },
    { label: "Blessings", href: "#blessings" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#e8c98a]/20 bg-[#1a0407]/90 py-3 backdrop-blur-md shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Monogram Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-heading text-xl font-bold tracking-widest text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8c98a]/50 bg-[#5c121e] text-xs text-[#e8c98a] group-hover:scale-105 transition-transform">
            {weddingConfig.couple.groom.firstName[0]}&{weddingConfig.couple.bride.firstName[0]}
          </span>
          <span className="font-serif text-sm tracking-[0.2em] text-[#e8c98a]">
            {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
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

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={weddingConfig.venues[0]?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=FM9M%2BCMG%2C+Manikpur%2C+Prayagraj%2C+Uttar+Pradesh+212208"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1105] shadow-md transition-all hover:brightness-110"
          >
            <Sparkles className="h-3 w-3" />
            <span>Venue Map</span>
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
          <a
            href="/admin"
            className="block rounded-xl px-4 py-2.5 text-xs text-[#e8c98a]/70 hover:text-[#e8c98a]"
          >
            Organizer Dashboard (Admin) →
          </a>
        </div>
      )}
    </header>
  );
}
