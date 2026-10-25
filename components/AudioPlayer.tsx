"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback synthesized pleasant royal sitar/harp arpeggio using Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null);

  const startAmbientSynth = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Raga Bhupali / Pentatonic notes (D4, E4, F#4, A4, B4, D5)
      const notes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];
      let noteIndex = 0;

      const playChime = () => {
        if (!isPlaying && hasInteracted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm harmonic mix
        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);
        noteIndex = (noteIndex + 1) % notes.length;

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2.5);
      };

      playChime();
      synthIntervalRef.current = setInterval(playChime, 1800);
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  };

  const stopAmbientSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
        stopAmbientSynth();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Audio file might not exist yet; use synthesized ambient score
            startAmbientSynth();
            setIsPlaying(true);
          });
      }
    } else {
      if (isPlaying) {
        stopAmbientSynth();
        setIsPlaying(false);
      } else {
        startAmbientSynth();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const handlePlayRequest = () => {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("play-wedding-music", handlePlayRequest);

    return () => {
      window.removeEventListener("play-wedding-music", handlePlayRequest);
      stopAmbientSynth();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.audioUrl}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#e8c98a]/30 bg-[#5c121e]/90 px-4 py-1.5 text-xs text-[#f5dfaa] shadow-lg backdrop-blur-md animate-pulse">
            <Music className="w-3.5 h-3.5 text-[#e8c98a]" />
            <span className="font-serif italic tracking-wide">{weddingConfig.music.title}</span>
          </div>
        )}

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
          className="group relative flex h-13 w-13 items-center justify-center rounded-full border border-[#e8c98a]/50 bg-gradient-to-br from-[#5c121e] to-[#2b060d] text-[#e8c98a] shadow-[0_8px_25px_rgba(232,201,138,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#e8c98a] hover:shadow-[0_10px_35px_rgba(232,201,138,0.45)]"
        >
          {/* Animated sound wave aura when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#e8c98a]/40 animate-ping opacity-60" />
          )}

          {isPlaying ? (
            <Volume2 className="h-5 w-5 transition-transform group-hover:scale-110" />
          ) : (
            <VolumeX className="h-5 w-5 opacity-70 transition-transform group-hover:scale-110 group-hover:opacity-100" />
          )}
        </button>
      </div>
    </>
  );
}
