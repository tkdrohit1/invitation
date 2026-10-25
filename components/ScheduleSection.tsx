"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  Sun,
  Heart,
  Crown,
  CalendarPlus,
} from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-5 w-5 text-[#e8c98a]" />,
  Music: <Music className="h-5 w-5 text-[#e8c98a]" />,
  Sun: <Sun className="h-5 w-5 text-[#e8c98a]" />,
  Heart: <Heart className="h-5 w-5 text-[#e8c98a]" />,
  Crown: <Crown className="h-5 w-5 text-[#e8c98a]" />,
};

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Celebration Itinerary</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          Events & Celebrations
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          We invite you to join us across two unforgettable days of joy, rituals, and celebration.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {weddingConfig.events.map((event) => (
          <div
            key={event.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e8c98a]/25 bg-gradient-to-b from-[#5c121e]/70 via-[#2b060d]/90 to-[#140205]/95 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#e8c98a]/60 hover:shadow-[0_15px_40px_rgba(232,201,138,0.15)] hover:-translate-y-1"
          >
            {/* Top Row: Icon & Tag */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8c98a]/30 bg-[#380a11] shadow-inner group-hover:scale-110 transition-transform">
                  {iconMap[event.iconName] || <Sparkles className="h-5 w-5 text-[#e8c98a]" />}
                </div>
                <span className="rounded-full border border-[#e8c98a]/30 bg-[#e8c98a]/10 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-[#f5dfaa]">
                  {event.date.split(",")[0]}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="font-heading text-2xl font-bold text-white mb-1 group-hover:text-[#e8c98a] transition-colors">
                {event.name}
              </h3>
              {event.subtitle && (
                <p className="font-script text-lg text-[#e8c98a]/90 mb-4">
                  {event.subtitle}
                </p>
              )}

              {/* Time & Venue Info */}
              <div className="space-y-2.5 text-xs text-white/75 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#e8c98a] shrink-0" />
                  <span className="font-medium text-white/90">{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#e8c98a] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white/90">{event.venue}</p>
                    <p className="text-[11px] text-white/50">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Dress Code Badge */}
              {event.dressCode && (
                <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-2.5 text-[11px] text-[#f5dfaa]">
                  <span className="font-bold uppercase tracking-wider text-[#e8c98a]/80 block text-[9px] mb-0.5">
                    Attire & Palette
                  </span>
                  {event.dressCode}
                </div>
              )}

              {/* Description */}
              <p className="font-serif text-xs leading-relaxed text-white/65">
                {event.description}
              </p>
            </div>

            {/* Bottom Add to Calendar Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={event.googleCalendarUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e8c98a]/40 bg-[#e8c98a]/10 py-2.5 text-xs font-semibold text-[#f5dfaa] transition-all hover:bg-[#e8c98a] hover:text-[#1a1105]"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                <span>Add to Google Calendar</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
