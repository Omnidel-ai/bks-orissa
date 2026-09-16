"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ADMIN_LOCALE_STORAGE } from "@/lib/admin-i18n";
import { LOCALES, type Locale } from "@/lib/i18n";

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function normalize(value: string | null): Locale | null {
  if (!value) return null;
  if (value === "od") return "or";
  if ((LOCALES as readonly string[]).includes(value)) return value as Locale;
  return null;
}

/** Admin locale — default English; separate from public Presence locale. */
function getSnapshot(): Locale {
  try {
    const stored = normalize(window.localStorage.getItem(ADMIN_LOCALE_STORAGE));
    if (stored) return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

export function useAdminLocale(): [Locale, (l: Locale) => void] {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((l: Locale) => {
    const next = normalize(l) ?? "en";
    try {
      window.localStorage.setItem(ADMIN_LOCALE_STORAGE, next);
    } catch {
      /* ignore */
    }
    emit();
  }, []);
  return [locale, setLocale];
}
