"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export default function GallerySection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % weddingConfig.gallery.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Moments Captured</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          Memories & Moments
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          Snapshots from our journey leading up to the celebration.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddingConfig.gallery.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className={`group relative overflow-hidden rounded-3xl border border-[#e8c98a]/20 bg-[#380a11] shadow-xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-[#e8c98a]/60 hover:shadow-[0_15px_40px_rgba(232,201,138,0.2)] ${
              idx === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-6">
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#e8c98a] font-semibold mb-1">
                <Sparkles className="h-3 w-3" /> Tap to expand
              </span>
              <p className="font-serif text-sm sm:text-base text-white/95">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e8c98a]/40 bg-black/60 text-[#e8c98a] hover:bg-[#e8c98a] hover:text-black transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e8c98a]/40 bg-black/60 text-[#e8c98a] hover:bg-[#e8c98a] hover:text-black transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image & Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden border border-[#e8c98a]/40 shadow-2xl">
              <Image
                src={weddingConfig.gallery[activePhotoIndex].url}
                alt={weddingConfig.gallery[activePhotoIndex].alt}
                fill
                sizes="1200px"
                className="object-contain"
              />
            </div>
            <p className="font-serif italic text-base sm:text-lg text-[#f5dfaa] mt-4 text-center">
              {weddingConfig.gallery[activePhotoIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
