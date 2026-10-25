"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, Heart, ChevronDown } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

interface HeroSectionProps {
  guestName?: string;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingConfig.couple.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center pt-20 pb-16 px-4 text-center overflow-hidden">
      {/* Background ambient lighting with soft romantic glow from the portrait */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
        <Image
          src={weddingConfig.couple.heroImage || "/images/couple-fairytale-v2.jpg"}
          alt="Ambient Background"
          fill
          priority
          className="object-cover blur-3xl scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0407]/90 via-[#2b060d]/70 to-[#1a0407]" />
      </div>

      {/* Radial ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[600px] w-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(92,18,30,0.6)_0%,_transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[350px] w-[500px] bg-[radial-gradient(circle,_rgba(232,201,138,0.15)_0%,_transparent_60%)]" />

      {/* Personalized Greeting Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 z-20 flex items-center gap-2 rounded-full border border-[#e8c98a]/35 bg-[#2b060d]/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#f5dfaa] shadow-lg backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#e8c98a]" />
        <span>
          {guestName
            ? `Warmest Welcome, ${guestName}`
            : "Together with our families"}
        </span>
      </motion.div>

      {/* Mobile-First Animated Film Portrait Card */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-md aspect-[9/16] rounded-[2.5rem] p-2 bg-neutral-950 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(92,18,30,0.5)] ring-1 ring-[#e8c98a]/30 my-4 overflow-hidden">
        {/* Inner Card Screen */}
        <div className="relative h-full w-full rounded-[2.1rem] overflow-hidden bg-black flex flex-col justify-between">
          
          {/* Animated Background Couple Portrait with Ken Burns motion */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={weddingConfig.couple.heroImage || "/images/couple-hero.jpg"}
              alt="Deepak & Pooja"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-[50%_15%]"
            />
          </motion.div>

          {/* Vignette & Gradients Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_35%,transparent_35%,rgba(26,4,7,0.55)_100%)]" />

          {/* Floating Golden Bokeh Particles & Falling Petals Animation */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {/* Bokeh Orbs */}
            {[
              { left: "15%", top: "20%", size: 10, delay: 0, dur: 4 },
              { left: "80%", top: "35%", size: 14, delay: 1.5, dur: 5 },
              { left: "25%", top: "60%", size: 8, delay: 0.8, dur: 4.5 },
              { left: "70%", top: "75%", size: 12, delay: 2.2, dur: 6 },
              { left: "50%", top: "15%", size: 6, delay: 3, dur: 3.5 },
            ].map((p, idx) => (
              <motion.span
                key={`bokeh-${idx}`}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
                className="absolute rounded-full bg-gradient-to-tr from-[#e8c98a] to-[#fff3d4] shadow-[0_0_12px_#e8c98a]"
              />
            ))}

            {/* Falling Rose Petals */}
            {[
              { left: "10%", delay: 0, dur: 6 },
              { left: "35%", delay: 2.5, dur: 7 },
              { left: "65%", delay: 1, dur: 6.5 },
              { left: "85%", delay: 4, dur: 8 },
            ].map((petal, idx) => (
              <motion.div
                key={`petal-${idx}`}
                animate={{
                  y: ["-10%", "110%"],
                  x: [0, (idx % 2 === 0 ? 25 : -25), 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: petal.dur,
                  repeat: Infinity,
                  delay: petal.delay,
                  ease: "linear",
                }}
                style={{ left: petal.left }}
                className="absolute top-0 h-3 w-2 rounded-full bg-gradient-to-br from-[#c82333] to-[#800f1c] shadow-sm opacity-70"
              />
            ))}
          </div>

          {/* Top Header inside Card */}
          <div className="relative z-20 pt-7 px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#f5dfaa] drop-shadow-md"
            >
              SAVE THE DATE
            </motion.p>
          </div>

          {/* Lower Card Overlay: Couple Names & Date with gradient backdrop to keep faces clear */}
          <div className="relative z-20 mt-auto px-4 pb-5 pt-8 text-center bg-gradient-to-t from-black/95 via-black/75 to-transparent">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="font-script text-4xl sm:text-5xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight">
                {weddingConfig.couple.groom.firstName} <span className="text-[#f5dfaa] text-3xl font-serif">&</span> {weddingConfig.couple.bride.firstName}
              </h1>

              {/* Gold Divider */}
              <div className="mx-auto my-2.5 flex items-center justify-center gap-2">
                <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#e8c98a]" />
                <span className="text-[#f5dfaa] text-xs">✦</span>
                <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#e8c98a]" />
              </div>

              {/* Date */}
              <p className="font-serif text-xs sm:text-sm font-bold tracking-[0.25em] text-[#f5dfaa] uppercase drop-shadow-md">
                24 NOVEMBER 2026
              </p>

              {/* Subtitle */}
              <p className="mt-0.5 font-sans text-[9px] font-semibold tracking-[0.3em] text-white/80 uppercase">
                DRIFTING INTO FOREVER
              </p>
            </motion.div>

            {/* Bottom Card Footer: Venue and Scroll Indicator */}
            <div className="pt-3 flex flex-col items-center">
              <div className="flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-black/60 px-3.5 py-1 text-[11px] text-[#f5dfaa] backdrop-blur-sm mb-2">
                <MapPin className="h-3 w-3 text-[#e8c98a]" />
                <span>Royal Garden</span>
              </div>

              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="text-[#f5dfaa]/80 flex flex-col items-center cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("schedule");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-[8px] uppercase tracking-widest text-white/50">Scroll to Explore</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#e8c98a]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 w-full max-w-sm z-10"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8c98a]/80 mb-3">
          COUNTDOWN TO THE AUSPICIOUS CEREMONY
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: "DAYS", val: timeLeft.days },
            { label: "HOURS", val: timeLeft.hours },
            { label: "MINS", val: timeLeft.minutes },
            { label: "SECS", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl border border-[#e8c98a]/30 bg-gradient-to-b from-[#5c121e]/70 to-[#160306]/90 py-2.5 px-2 shadow-lg backdrop-blur-md"
            >
              <span className="font-heading text-xl sm:text-2xl font-bold text-white tabular-nums">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider text-[#e8c98a]/70 uppercase mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 z-10"
      >
        <a
          href="#schedule"
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#e8c98a] via-[#f5dfaa] to-[#d4b06a] px-7 py-3 font-heading text-xs font-bold uppercase tracking-widest text-[#1a1105] shadow-[0_10px_35px_rgba(232,201,138,0.3)] transition-all duration-300 hover:scale-105 hover:brightness-110"
        >
          <Calendar className="h-4 w-4" />
          <span>Celebration Events</span>
        </a>

        <a
          href={weddingConfig.venues[0]?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=FM9M%2BCMG%2C+Manikpur%2C+Prayagraj%2C+Uttar+Pradesh+212208"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-heading text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-[#e8c98a]/60 hover:bg-white/10"
        >
          <MapPin className="h-3.5 w-3.5 text-[#e8c98a]" />
          <span>Royal Garden Map</span>
        </a>
      </motion.div>
    </section>
  );
}
