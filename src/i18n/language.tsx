import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ui, type Lang, type UIStrings } from "./translations";
import { track } from "../lib/analytics";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: UIStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem("lang");
  if (stored === "pt" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const langRef = useRef(lang);
  langRef.current = lang;
  const setLang = useCallback((next: Lang) => {
    if (next !== langRef.current) track("language_changed", { language: next });
    setLangState(next);
  }, []);
  const toggleLang = useCallback(() => {
    const next = langRef.current === "pt" ? "en" : "pt";
    track("language_changed", { language: next });
    setLangState(next);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: ui[lang] }),
    [lang, setLang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
