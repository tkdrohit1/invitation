"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareHeart, Sparkles, Send, Loader2, Quote } from "lucide-react";
import { BlessingItem } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function BlessingsWall() {
  const { t, language } = useLanguage();
  const [blessings, setBlessings] = useState<BlessingItem[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const fetchBlessings = async () => {
    try {
      const res = await fetch("/api/blessings");
      const data = await res.json();
      if (data.success) {
        setBlessings(data.blessings);
      }
    } catch (e) {
      console.error("Error loading blessings", e);
    }
  };

  useEffect(() => {
    fetchBlessings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/blessings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: authorName.trim(),
          relation: relation.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAuthorName("");
        setRelation("");
        setMessage("");
        setToastMsg(t.blessings.successToast);
        fetchBlessings();
        setTimeout(() => setToastMsg(""), 4000);
      }
    } catch {
      setToastMsg(t.blessings.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="blessings" className="relative py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8c98a] backdrop-blur-md mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>{t.blessings.badge}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wide">
          {t.blessings.title}
        </h2>
        <div className="mx-auto my-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#e8c98a] to-transparent" />
        <p className="font-serif italic text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          {t.blessings.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-5 rounded-3xl border border-[#e8c98a]/30 bg-gradient-to-b from-[#5c121e]/80 to-[#140205]/95 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="font-heading text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>{t.blessings.formTitle}</span>
            <Sparkles className="h-4 w-4 text-[#e8c98a]" />
          </h3>
          <p className="font-serif text-xs text-white/60 mb-6">
            {t.blessings.formSubtitle}
          </p>

          {toastMsg && (
            <div className="mb-4 rounded-xl border border-[#e8c98a]/40 bg-[#e8c98a]/10 p-3 text-xs text-[#f5dfaa]">
              {toastMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                {t.blessings.nameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={t.blessings.namePlaceholder}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#e8c98a]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                {t.blessings.relationLabel}
              </label>
              <input
                type="text"
                placeholder={t.blessings.relationPlaceholder}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#e8c98a]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                {t.blessings.messageLabel}
              </label>
              <textarea
                rows={4}
                required
                placeholder={t.blessings.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#e8c98a]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] py-3 text-xs font-bold uppercase tracking-wider text-[#1a1105] shadow-md transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#1a1105]" />
                  <span>{t.blessings.submittingBtn}</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>{t.blessings.submitBtn}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Feed of Cards */}
        <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-1">
          {blessings.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-xs text-white/50">
              {t.blessings.emptyState}
            </div>
          ) : (
            blessings.map((item) => {
              // Show Hindi translation for preloaded blessings if language is Hindi
              let displayAuthor = item.authorName;
              let displayRelation = item.relation;
              let displayMessage = item.message;

              if (language === "hi") {
                if (item.id === "blessing-1") {
                  displayAuthor = "दादी एवं दादाजी";
                  displayRelation = "वर/वधू के दादा-दादी";
                  displayMessage = "भगवान शिव और माता पार्वती की असीम कृपा आप दोनों पर सदैव बनी रहे। दीपक और पूजा, तुम दोनों का दांपत्य जीवन सुख, प्रेम और समृद्धि से परिपूर्ण हो। हमारा हार्दिक आशीर्वाद!";
                } else if (item.id === "blessing-3") {
                  displayAuthor = "पटेल परिवार";
                  displayRelation = "पारिवारिक स्नेहीजन";
                  displayMessage = "दीपक और पूजा को जीवन भर के अटूट साथ, खुशियों और मुस्कान की ढेरों शुभकामनाएं। २४ नवंबर के भव्य विवाह उत्सव की उत्सुकता से प्रतीक्षा है!";
                }
              }

              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#5c121e]/40 via-[#2b060d]/70 to-[#160306]/90 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#e8c98a]/35"
                >
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-[#e8c98a]/15 group-hover:text-[#e8c98a]/30 transition" />

                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-heading text-base font-bold text-white">
                      {displayAuthor}
                    </h4>
                    {displayRelation && (
                      <span className="rounded-full border border-[#e8c98a]/30 bg-[#e8c98a]/10 px-2.5 py-0.5 text-[9px] font-semibold text-[#f5dfaa] uppercase tracking-wider">
                        {displayRelation}
                      </span>
                    )}
                  </div>

                  <p className="font-serif italic text-sm leading-relaxed text-white/80 pr-6">
                    &ldquo;{displayMessage}&rdquo;
                  </p>

                  <div className="mt-3 text-[10px] text-white/40 font-mono">
                    {new Date(item.createdAt).toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
