"use client";

import React from "react";
import { MapPin, Navigation, Compass, Building2 } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";
import { useLanguage } from "@/context/LanguageContext";

export default function VenueSection() {
  const { t } = useLanguage();

  return (
    <section id="venues" className="relative py-24 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{t.venue.badge}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          {t.venue.title}
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          {t.venue.subtitle}
        </p>
      </div>

      {/* Venues Grid */}
      <div className="max-w-2xl mx-auto">
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e8c98a]/30 bg-gradient-to-b from-[#5c121e]/60 via-[#2b060d]/80 to-[#160306]/90 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#e8c98a]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e8c98a]/40 bg-[#380a11] text-[#e8c98a] shadow-inner">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-white group-hover:text-[#e8c98a] transition-colors">
                  {t.venue.name}
                </h3>
                <p className="text-xs font-serif text-[#e8c98a]/80 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {t.venue.city}
                </p>
              </div>
            </div>

            <p className="font-serif text-sm sm:text-base leading-relaxed text-white/80 mb-6">
              {t.venue.description}
            </p>

            {/* Address card */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#e8c98a]/80 block mb-1">
                {t.venue.addressLabel}
              </span>
              <p className="text-sm text-white/95 leading-relaxed font-sans font-medium">
                {t.venue.address}
              </p>
            </div>

            {/* Guest Logistics */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#e8c98a]/20 bg-[#5c121e]/30 p-4 mb-6 text-xs text-[#f5dfaa]">
              <Compass className="h-4 w-4 shrink-0 text-[#e8c98a] mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-[#e8c98a] mb-0.5">
                  {t.venue.logisticsLabel}
                </span>
                <p className="leading-relaxed opacity-90">{t.venue.logistics}</p>
              </div>
            </div>
          </div>

          {/* Direct Navigation Button */}
          <div className="pt-4 border-t border-white/10">
            <a
              href={weddingConfig.venues[0]?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=FM9M%2BCMG%2C+Manikpur%2C+Prayagraj%2C+Uttar+Pradesh+212208"}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] py-3.5 text-xs font-bold uppercase tracking-widest text-[#1a1105] shadow-lg transition-all hover:brightness-110"
            >
              <Navigation className="h-4 w-4 fill-[#1a1105]" />
              <span>{t.venue.mapBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
