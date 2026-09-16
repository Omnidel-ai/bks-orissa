"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLocale } from "@/lib/useLocale";

const STORAGE_KEY = "bks-orissa-locale";

/** Production chrome around Presence pages — Odia-first when no locale chosen yet. */
export default function PresenceShell({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useLocale();

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setLocale("or");
      }
    } catch {
      /* ignore */
    }
  }, [setLocale]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
