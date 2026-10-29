"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationContent, translations } from "@/config/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // 1. Check URL param ?lang=hi or ?lang=hindi or ?lang=en
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang")?.toLowerCase();
      if (urlLang === "hi" || urlLang === "hindi") {
        setLanguageState("hi");
        try {
          localStorage.setItem("wedding_lang", "hi");
        } catch {}
        return;
      }
      if (urlLang === "en" || urlLang === "english") {
        setLanguageState("en");
        try {
          localStorage.setItem("wedding_lang", "en");
        } catch {}
        return;
      }

      // 2. Check localStorage
      try {
        const savedLang = localStorage.getItem("wedding_lang") as Language;
        if (savedLang === "hi" || savedLang === "en") {
          setLanguageState(savedLang);
        }
      } catch {}
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("wedding_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
