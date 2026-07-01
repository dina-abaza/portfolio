"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("aurora-lang");
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("aurora-lang", next);
  };

  const T = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, isAr: lang === "ar", T }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
