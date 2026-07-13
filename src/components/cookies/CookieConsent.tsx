"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, SlidersHorizontal, X } from "lucide-react";
import { COOKIE_CONSENT_EVENT } from "@/components/analytics/GoogleAnalytics";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "crediple-cookie-preferences";
const CONSENT_COOKIE = "crediple_cookie_consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function persistPreferences(preferences: CookiePreferences) {
  const encoded = encodeURIComponent(JSON.stringify(preferences));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  document.cookie = `${CONSENT_COOKIE}=${encoded}; Max-Age=31536000; Path=/; SameSite=Lax`;
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      className="flex items-start justify-between gap-4 rounded-lg p-4"
      style={{
        background: "var(--card-inner)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {label}
        </span>
        <span className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-5 w-5 accent-blue-500"
        aria-label={label}
      />
    </label>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const timer = window.setTimeout(() => setVisible(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const save = (nextPreferences: CookiePreferences) => {
    persistPreferences(nextPreferences);
    setPreferences(nextPreferences);
    setVisible(false);
    setCustomizing(false);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-lg p-4 shadow-2xl sm:p-5"
            style={{
              background: "color-mix(in srgb, var(--card-bg) 94%, black)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.32)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "var(--icon-accent-bg)",
                    border: "1px solid var(--icon-accent-border)",
                  }}
                >
                  <Cookie className="h-5 w-5" style={{ color: "var(--icon-accent)" }} />
                </div>
                <div>
                  <h2
                    id="cookie-consent-title"
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Cookie Preferences
                  </h2>
                  <p
                    className="mt-2 max-w-2xl text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    We use cookies to enhance your browsing experience, analyze site traffic,
                    and improve our services. By clicking &quot;Accept All&quot;, you consent
                    to our use of cookies.{" "}
                    <Link
                      href="/legal"
                      className="font-medium underline underline-offset-4"
                      style={{ color: "var(--accent-color)" }}
                    >
                      Learn More
                    </Link>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => save(defaultPreferences)}
                className="absolute right-4 top-4 rounded-md p-2 lg:static"
                style={{ color: "var(--text-muted)" }}
                aria-label="Close cookie consent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {customizing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24 }}
                  className="mt-4 grid gap-3 md:grid-cols-3"
                >
                  <Toggle
                    label="Necessary Cookies"
                    description="Required for website functionality."
                    checked
                    disabled
                  />
                  <Toggle
                    label="Analytics Cookies"
                    description="Used for website performance monitoring."
                    checked={preferences.analytics}
                    onChange={(analytics) =>
                      setPreferences((current) => ({ ...current, analytics }))
                    }
                  />
                  <Toggle
                    label="Marketing Cookies"
                    description="Used for future marketing and campaign tracking."
                    checked={preferences.marketing}
                    onChange={(marketing) =>
                      setPreferences((current) => ({ ...current, marketing }))
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setCustomizing((currentCustomizing) => !currentCustomizing)
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  background: "var(--secondary)",
                }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Customize Preferences
              </button>
              <button
                type="button"
                onClick={() => save(defaultPreferences)}
                className="h-11 rounded-lg px-4 text-sm font-semibold"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  background: "transparent",
                }}
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() =>
                  save({ necessary: true, analytics: true, marketing: true })
                }
                className="h-11 rounded-lg px-5 text-sm font-semibold"
                style={{
                  background: "var(--cta-bg)",
                  color: "var(--cta-text)",
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
