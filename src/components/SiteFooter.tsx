"use client";

import { t, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = t(locale);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="section-seam" aria-hidden="true" style={{ marginBottom: 36 }} />
        <p className="site-footer-quote">{dict.footer.quote}</p>
        <div className="site-footer-contact" aria-label="BKS Odisha">
          <p className="site-footer-org">{dict.footer.org}</p>
          <p>Website: www.bksorissa.org</p>
        </div>
      </div>
    </footer>
  );
}
