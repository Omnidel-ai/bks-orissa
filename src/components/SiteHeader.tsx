"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LOCALE_LABELS, LOCALES, t, type Locale } from "@/lib/i18n";
import { NATIONAL_PRESIDENT_URL } from "@/lib/site";

export function SiteHeader({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}) {
  const dict = t(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.navOpen = menuOpen ? "true" : "false";
  }, [locale, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`}>
      <div className="wrap site-header-row">
        <Link href="/" className="site-brand" aria-label={dict.brand} onClick={closeMenu}>
          <Image
            src="/assets/bks-logo.png"
            alt="Bharatiya Krishak Samaj"
            width={42}
            height={42}
            className="site-brand-logo"
            priority
          />
          <span className="site-brand-text">
            <strong>{dict.brand}</strong>
            <small>{dict.brandSub}</small>
          </span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? dict.common.close : dict.common.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav id="site-navigation" className="site-nav" aria-label="Sections">
          <div className="site-nav-scroll">
            <p className="site-nav-group-label" aria-hidden="true">
              {dict.nav.aboutGroup}
            </p>
            <Link href="/about" onClick={closeMenu}>
              {dict.nav.about}
            </Link>
            <Link href="/odisha" onClick={closeMenu}>
              {dict.nav.odisha}
            </Link>
            <Link href="/agriculture" onClick={closeMenu}>
              {dict.nav.agriculture}
            </Link>
            <Link href="/leadership" onClick={closeMenu}>
              {dict.nav.leadership}
            </Link>
            <Link href="/presence" onClick={closeMenu}>
              {dict.nav.presence}
            </Link>
            <a
              href={NATIONAL_PRESIDENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav-external"
              onClick={closeMenu}
            >
              {dict.nav.nationalPresident}
              <span className="site-nav-ext-mark" aria-hidden="true">
                ↗
              </span>
            </a>

            <details className="site-nav-learn site-nav-learn-desktop">
              <summary className="site-nav-learn-summary">{dict.nav.learnGroup}</summary>
              <div className="site-nav-learn-panel">
                <Link href="/agriculture" onClick={closeMenu}>
                  {dict.nav.agriculture}
                </Link>
                <Link href="/media" onClick={closeMenu}>
                  {dict.nav.media}
                </Link>
              </div>
            </details>

            <div className="site-nav-learn-mobile">
              <p className="site-nav-group-label" aria-hidden="true">
                {dict.nav.learnGroup}
              </p>
              <Link href="/agriculture" onClick={closeMenu}>
                {dict.nav.agriculture}
              </Link>
              <Link href="/media" onClick={closeMenu}>
                {dict.nav.media}
              </Link>
            </div>
          </div>
          <div className="site-nav-footer">
            <Link href="/apply" className="site-nav-apply" onClick={closeMenu}>
              {dict.nav.apply}
            </Link>
          </div>
        </nav>

        <label className="lang-toggle lang-toggle-compact">
          <span className="sr-only">Language</span>
          <select
            className="lang-toggle-select"
            value={locale}
            aria-label="Language"
            onChange={(event) => {
              const next = event.target.value as Locale;
              if ((LOCALES as readonly string[]).includes(next)) {
                onLocaleChange(next);
              }
            }}
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>
                {LOCALE_LABELS[l]}
              </option>
            ))}
          </select>
        </label>
      </div>
      {menuOpen ? (
        <button
          type="button"
          className="site-nav-backdrop"
          aria-label={dict.common.close}
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
