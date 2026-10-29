"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ChevronDown, Globe } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface EnvelopeModalProps {
  onOpen?: () => void;
  guestName?: string;
  isOpenControlled?: boolean;
  onClose?: () => void;
}

export default function EnvelopeModal({
  onOpen,
  guestName,
  isOpenControlled,
  onClose,
}: EnvelopeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    if (isOpenControlled !== undefined) {
      if (isOpenControlled) {
        setIsDismissed(false);
        setIsOpen(false);
      } else {
        setIsDismissed(true);
      }
    } else {
      const openedBefore = sessionStorage.getItem("envelope_opened");
      if (openedBefore === "true") {
        setIsDismissed(true);
        if (onOpen) onOpen();
      }
    }
  }, [isOpenControlled, onOpen]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);

      // Trigger celebratory golden sparkles
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#e8c98a", "#f5dfaa", "#ffffff", "#c89c4b"],
      });

      // Start auspicious royal wedding music
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("play-wedding-music"));
      }

      if (onOpen) onOpen();
    }
  };

  const handleEnterSite = () => {
    sessionStorage.setItem("envelope_opened", "true");
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-wedding-music"));
    }
    if (onClose) onClose();
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-xl"
      >
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[#5c121e]/40 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#e8c98a]/15 blur-[90px]" />
        </div>

        <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
          {/* Top greeting badge & Language switcher */}
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center justify-between w-full max-w-md px-1 gap-2"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/80 px-4 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md shadow-lg truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#e8c98a] shrink-0" />
              <span className="truncate">{t.envelope.badge(guestName)}</span>
            </div>

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              title={language === "en" ? "हिंदी में देखें" : "View in English"}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/40 bg-[#2b060d]/85 hover:bg-[#5c121e] px-3 py-1.5 text-xs font-semibold tracking-wider text-[#f5dfaa] transition backdrop-blur-md shadow-md active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-[#e8c98a]" />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </button>
          </motion.div>

          {/* Envelope Container */}
          <div className="relative w-full aspect-[4/3] max-w-md perspective-[1200px]">
            {/* The Envelope Body */}
            <motion.div
              layout
              className="relative h-full w-full overflow-hidden rounded-2xl border border-[#e8c98a]/30 bg-gradient-to-b from-[#6d1624] to-[#2b060d] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Gold foil decorative filigree corner borders */}
              <div className="absolute top-3 left-3 h-8 w-8 border-t-2 border-l-2 border-[#e8c98a]/60 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-3 right-3 h-8 w-8 border-t-2 border-r-2 border-[#e8c98a]/60 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-[#e8c98a]/60 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-[#e8c98a]/60 rounded-br-sm pointer-events-none" />

              {/* Envelope Inside Letter Card (Slides Up on Open) */}
              <motion.div
                initial={false}
                animate={{
                  y: isOpen ? -30 : 50,
                  opacity: isOpen ? 1 : 0.8,
                  scale: isOpen ? 1 : 0.95,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-x-5 inset-y-5 rounded-xl border border-[#e8c98a]/40 bg-[#fdf9f0] p-6 text-center text-[#1a1105] shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <p className="font-script text-2xl text-[#8e6c27] md:text-3xl">
                    {t.envelope.saveTheDate}
                  </p>
                  <h3 className="font-heading text-xl font-bold tracking-wide text-[#5c121e] mt-1 md:text-2xl">
                    {language === "hi" ? "दीपक एवं पूजा" : `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`}
                  </h3>
                  <div className="mx-auto my-2.5 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#8e6c27] to-transparent" />
                  <p className="font-serif italic text-xs leading-relaxed text-neutral-700 px-2 line-clamp-3 md:line-clamp-none">
                    &ldquo;{t.envelope.letter}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#8e6c27]/20">
                  <p className="font-heading text-sm font-semibold tracking-widest text-[#5c121e]">
                    {t.envelope.displayDate}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                    {t.envelope.city}
                  </p>
                </div>
              </motion.div>

              {/* Envelope Flap Triangles (Folded over before open) */}
              <motion.div
                animate={{
                  rotateX: isOpen ? 180 : 0,
                  zIndex: isOpen ? 0 : 30,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#7a1928] to-[#5c121e] border-b border-[#e8c98a]/40 shadow-md"
              >
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #0a4f4d 0%, #5c121e 100%)",
                  }}
                />
              </motion.div>

              {/* Envelope Bottom Pocket Flaps (Always in front of letter before open) */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 z-20"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 50% 25%)",
                  background: "linear-gradient(0deg, #380a11 0%, #3f0a13 100%)",
                  borderTop: "1px solid rgba(232, 201, 138, 0.2)",
                }}
              />

              {/* The Wax Seal (Center) */}
              {!isOpen && (
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center"
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#f5dfaa] bg-gradient-to-br from-[#c89c4b] via-[#e8c98a] to-[#9c7225] shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(232,201,138,0.4)]">
                    <span className="font-heading text-lg font-black tracking-widest text-[#241704]">
                      {language === "hi" ? "द&पू" : `${weddingConfig.couple.groom.firstName[0]}&${weddingConfig.couple.bride.firstName[0]}`}
                    </span>
                    <Heart className="absolute bottom-2 h-3.5 w-3.5 fill-[#241704] text-[#241704]" />
                  </div>
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-3 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 font-serif text-[11px] font-medium tracking-widest text-[#f5dfaa] border border-[#e8c98a]/40 backdrop-blur-sm"
                  >
                    {t.envelope.tapToBreak}
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Action Button after opening */}
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <button
                onClick={handleEnterSite}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#e8c98a] via-[#f5dfaa] to-[#d4b06a] px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-[#1a1105] shadow-[0_10px_35px_rgba(232,201,138,0.35)] transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                <span>{t.envelope.enterCelebration}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
              <p className="text-[11px] tracking-widest text-white/50 uppercase">
                {language === "hi" ? "नीचे स्क्रॉल करके कार्यक्रम विवरण देखें" : "Scroll down to discover the itinerary & RSVP"}
              </p>
            </motion.div>
          ) : (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleEnterSite}
                className="text-xs uppercase tracking-widest text-white/40 transition hover:text-[#e8c98a]"
              >
                {language === "hi" ? "सीधे विवरण देखें →" : "Skip straight to details →"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
