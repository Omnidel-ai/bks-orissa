"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLocale } from "@/lib/useLocale";

export function SiteShell({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useLocale();

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
