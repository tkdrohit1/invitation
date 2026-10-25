"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export default function OurStorySection() {
  return (
    <section id="our-story" className="relative py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Journey</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          How Our Forever Began
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          Every love story is beautiful, but ours is our favorite chapter.
        </p>
      </div>

      {/* Story Timeline */}
      <div className="relative border-l border-[#e8c98a]/20 ml-4 sm:ml-32 md:ml-40 space-y-12">
        {weddingConfig.story.map((milestone, idx) => (
          <div key={idx} className="relative pl-8 sm:pl-12 group">
            {/* Timeline Marker Point */}
            <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#e8c98a] bg-[#2b060d] shadow-[0_0_10px_rgba(232,201,138,0.5)] transition-transform group-hover:scale-125">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5dfaa]" />
            </div>

            {/* Year Label in Margins */}
            <div className="sm:absolute sm:-left-32 sm:top-0 sm:w-24 sm:text-right mb-2 sm:mb-0">
              <span className="font-heading text-xl font-bold tracking-widest text-[#e8c98a]">
                {milestone.year}
              </span>
            </div>

            {/* Milestone Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#5c121e]/40 via-[#2b060d]/70 to-[#160306]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[#e8c98a]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              {milestone.image && (
                <div className="md:col-span-4 relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#e8c98a]/20 shadow-md">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className={milestone.image ? "md:col-span-8" : "md:col-span-12"}>
                <h3 className="font-heading text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{milestone.title}</span>
                  <Heart className="h-4 w-4 fill-[#e8c98a]/30 text-[#e8c98a]" />
                </h3>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-white/75">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
