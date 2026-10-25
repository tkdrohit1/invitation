"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Heart, Users, Utensils, Send, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingConfig } from "@/config/wedding.config";

interface RsvpSectionProps {
  initialGuestName?: string;
}

export default function RsvpSection({ initialGuestName }: RsvpSectionProps) {
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietaryPreference, setDietaryPreference] = useState<"vegetarian" | "non-veg" | "halal" | "jain" | "other">("vegetarian");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [eventsAttending, setEventsAttending] = useState<string[]>(
    weddingConfig.events.map((e) => e.id)
  );
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialGuestName) {
      setGuestName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleToggleEvent = (eventId: string) => {
    setEventsAttending((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!guestName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          emailOrPhone: emailOrPhone.trim(),
          attending,
          guestCount: attending === "yes" ? guestCount : 0,
          dietaryPreference,
          dietaryNotes: dietaryNotes.trim(),
          eventsAttending: attending === "yes" ? eventsAttending : [],
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        if (attending === "yes") {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#e8c98a", "#f5dfaa", "#ffffff", "#5c121e"],
          });
        }
      } else {
        setErrorMsg(data.error || "Failed to submit RSVP. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-24 px-6 max-w-3xl mx-auto">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] bg-[radial-gradient(circle,_rgba(232,201,138,0.1)_0%,_transparent_70%)]" />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <Heart className="w-3.5 h-3.5" />
          <span>Kindly Respond</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          RSVP to Our Celebration
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70">
          Your presence will make our union truly memorable. Please let us know if you will join us.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#e8c98a]/35 bg-gradient-to-b from-[#5c121e]/90 via-[#2b060d]/95 to-[#160306]/95 p-8 shadow-2xl backdrop-blur-xl">
        {isSubmitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e8c98a] bg-[#380a11] text-[#e8c98a] mb-6 shadow-lg animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-2">
              {attending === "yes" ? "We Cannot Wait to Celebrate!" : "Warm Wishes Received"}
            </h3>
            <p className="font-serif text-base text-white/80 max-w-md mx-auto mb-6">
              Thank you, <span className="text-[#f5dfaa] font-semibold">{guestName}</span>. Your response has been securely confirmed and recorded for our catering and hospitality team.
            </p>
            {attending === "yes" && (
              <div className="rounded-2xl border border-[#e8c98a]/30 bg-black/40 p-4 text-xs text-[#f5dfaa] mb-6">
                <p>Party Size: <span className="font-bold">{guestCount} guests</span></p>
                <p>Meal Preference: <span className="font-bold capitalize">{dietaryPreference}</span></p>
              </div>
            )}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs uppercase tracking-widest text-[#e8c98a] underline underline-offset-4 hover:opacity-80 transition"
            >
              Modify or submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#e8c98a] mb-3">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-xs font-bold uppercase tracking-wider transition-all ${
                    attending === "yes"
                      ? "border-[#e8c98a] bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] text-[#1a1105] shadow-[0_4px_20px_rgba(232,201,138,0.3)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Joyfully Accepts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-xs font-bold uppercase tracking-wider transition-all ${
                    attending === "no"
                      ? "border-[#e8c98a] bg-[#380a11] text-[#f5dfaa] shadow-md"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  }`}
                >
                  <span>Regretfully Declines</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-2">
                  Full Name / Family Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma & Family"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e8c98a] focus:ring-1 focus:ring-[#e8c98a]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-2">
                  WhatsApp / Phone / Email
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e8c98a] focus:ring-1 focus:ring-[#e8c98a]"
                />
              </div>
            </div>

            {attending === "yes" && (
              <>
                {/* Guest Count Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-white/80">
                      <Users className="h-3.5 w-3.5 text-[#e8c98a]" />
                      <span>Total Guests Attending (including you)</span>
                    </label>
                    <span className="font-heading text-lg font-bold text-[#e8c98a]">
                      {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      className="flex h-10 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-lg font-bold text-white transition hover:bg-white/10"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#e8c98a]"
                    />
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(8, c + 1))}
                      className="flex h-10 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-lg font-bold text-white transition hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-white/80 mb-2">
                    <Utensils className="h-3.5 w-3.5 text-[#e8c98a]" />
                    <span>Dietary Preference (For Caterer Planning)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "vegetarian", label: "Vegetarian" },
                      { id: "non-veg", label: "Non-Veg" },
                      { id: "jain", label: "Jain Meal" },
                      { id: "halal", label: "Halal" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setDietaryPreference(item.id as "vegetarian" | "non-veg" | "halal" | "jain")}
                        className={`rounded-xl border py-2 px-3 text-xs font-medium transition ${
                          dietaryPreference === item.id
                            ? "border-[#e8c98a] bg-[#e8c98a]/20 text-[#f5dfaa] font-bold"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Any allergies or specific dietary notes (e.g. nut allergy, vegan)"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#e8c98a]"
                  />
                </div>

                {/* Events Attending Checkboxes */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    Which celebrations will you attend?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {weddingConfig.events.map((ev) => (
                      <label
                        key={ev.id}
                        className={`flex items-center gap-2.5 rounded-xl border p-2.5 cursor-pointer transition ${
                          eventsAttending.includes(ev.id)
                            ? "border-[#e8c98a]/50 bg-[#5c121e]/50 text-white"
                            : "border-white/10 bg-white/5 text-white/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={eventsAttending.includes(ev.id)}
                          onChange={() => handleToggleEvent(ev.id)}
                          className="accent-[#e8c98a]"
                        />
                        <span>{ev.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Loving Message */}
            <div>
              <label className="block text-xs font-medium text-white/80 mb-2">
                A Note or Wish for the Couple
              </label>
              <textarea
                rows={3}
                placeholder="Share your warm thoughts, excitement, or favorite memory..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e8c98a] focus:ring-1 focus:ring-[#e8c98a]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#e8c98a] via-[#f5dfaa] to-[#d4b06a] py-4 font-heading text-sm font-bold uppercase tracking-widest text-[#1a1105] shadow-[0_10px_35px_rgba(232,201,138,0.35)] transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#1a1105]" />
                  <span>Confirming Response...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send RSVP</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
