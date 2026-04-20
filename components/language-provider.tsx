"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type LangCode, type Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: translations.EN,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("EN");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
