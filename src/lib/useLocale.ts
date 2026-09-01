"use client";

import { useCallback, useSyncExternalStore } from "react";
import { LOCALES, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "bks-orissa-locale";
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

function normalizeLocale(value: string | null): Locale | null {
  if (!value) return null;
  // Accept legacy "od" alias as Odia (ISO 639-1 is "or")
  if (value === "od") return "or";
  if ((LOCALES as readonly string[]).includes(value)) return value as Locale;
  return null;
}

function getSnapshot(): Locale {
  try {
    const stored = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((l: Locale) => {
    const next = normalizeLocale(l) ?? "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emit();
  }, []);
  return [locale, setLocale];
}
