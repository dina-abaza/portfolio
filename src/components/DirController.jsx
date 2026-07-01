"use client";
import { useEffect } from "react";
import { useLang } from "@/context/LangContext";

export default function DirController() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
