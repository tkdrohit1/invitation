"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EnvelopeModal from "@/components/EnvelopeModal";
import ScratchDateCard from "@/components/ScratchDateCard";
import ScheduleSection from "@/components/ScheduleSection";
import VenueSection from "@/components/VenueSection";
import BlessingsWall from "@/components/BlessingsWall";
import AudioPlayer from "@/components/AudioPlayer";
import FooterSection from "@/components/FooterSection";
import MobileNavDock from "@/components/MobileNavDock";

function WeddingInviteContent() {
  const searchParams = useSearchParams();
  const rawGuestParam = searchParams.get("to") || searchParams.get("guest") || "";
  const guestName = rawGuestParam ? decodeURIComponent(rawGuestParam).trim() : "";
  const [showEnvelope, setShowEnvelope] = useState<boolean | undefined>(undefined);

  return (
    <main className="relative min-h-screen maroon-stars-pattern text-white overflow-x-hidden pb-24">
      {/* 3D Wax Seal Envelope Intro Modal */}
      <EnvelopeModal
        guestName={guestName}
        isOpenControlled={showEnvelope}
        onClose={() => setShowEnvelope(false)}
      />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* Top Navbar */}
      <Navbar />

      {/* Mobile-First Animated Film Card Hero Section */}
      <HeroSection guestName={guestName} />

      {/* Interactive Scratch-to-Reveal Save-the-Date Section */}
      <section className="py-8 px-4 sm:px-6">
        <ScratchDateCard />
      </section>

      {/* Celebration Events Schedule (Mehendi, Haldi, Wedding & Pheras) */}
      <ScheduleSection />

      {/* Royal Garden Venue & Google Maps Navigation */}
      <VenueSection />

      {/* Blessings Guestbook Wall */}
      <BlessingsWall />

      {/* Footer */}
      <FooterSection />

      {/* Floating Mobile Bottom Navigation Dock */}
      <MobileNavDock onOpenEnvelope={() => setShowEnvelope(true)} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#1a0407] text-[#e8c98a]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e8c98a] border-t-transparent" />
            <span className="font-serif italic text-sm tracking-widest">
              Unfolding your invitation...
            </span>
          </div>
        </div>
      }
    >
      <WeddingInviteContent />
    </Suspense>
  );
}
