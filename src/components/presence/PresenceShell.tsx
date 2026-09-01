"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLocale } from "@/lib/useLocale";

/** Production chrome around Presence pages — same pattern as BKS West Bengal. */
export default function PresenceShell({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useLocale();

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
