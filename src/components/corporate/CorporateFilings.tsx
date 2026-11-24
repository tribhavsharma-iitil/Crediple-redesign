"use client";

import { useEffect, useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

type Filing = {
  title: string;
  year: string;
  description: string;
  fileName: string;
};

const filings: Filing[] = [
  {
    title: "MGT-7A",
    year: "2025-26",
    description:
      "Annual return filing for Crediple India Private Limited for the financial year 2025-26.",
    fileName: "MGT-7A signed_2025-26.pdf",
  },
  {
    title: "MGT-7A",
    year: "2024-25",
    description:
      "Annual return filing for Crediple India Private Limited for the financial year 2024-25.",
    fileName: "AC5660451 - MGT-7A_2024-25.pdf",
  },
];

export default function CorporateFilings() {
  const [activeFiling, setActiveFiling] = useState<Filing | null>(null);

  useEffect(() => {
    if (!activeFiling) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveFiling(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeFiling]);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {filings.map((filing) => {
          const fileUrl = `/corporate-secretarial/${encodeURIComponent(filing.fileName)}`;

          return (
            <article
              key={`${filing.title}-${filing.year}`}
              className="overflow-hidden rounded-[24px]"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "0 18px 54px rgba(0,0,0,0.10)",
              }}
            >
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "var(--icon-accent-bg)",
                    border: "1px solid var(--icon-accent-border)",
                    color: "var(--accent-color)",
                  }}
                >
                  <FileText className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      className="text-lg font-bold sm:text-xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {filing.title}
                    </h2>
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        background: "var(--icon-accent-bg)",
                        color: "var(--accent-color)",
                        border: "1px solid var(--icon-accent-border)",
                      }}
                    >
                      FY {filing.year}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {filing.description}
                  </p>
                </div>
              </div>

              <div
                className="border-t px-5 py-4 sm:px-6"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveFiling(filing)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{
                      background: "var(--accent-color)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View PDF
                  </button>
                  <a
                    href={fileUrl}
                    download
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-opacity hover:opacity-80"
                    style={{
                      background: "var(--card-inner)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {activeFiling && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeFiling.title} FY ${activeFiling.year} PDF`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveFiling(null);
          }}
        >
          <div
            className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="flex min-h-16 items-center justify-between gap-4 border-b px-4 sm:px-6"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="min-w-0">
                <p
                  className="truncate text-sm font-bold sm:text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  {activeFiling.title} — FY {activeFiling.year}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`/corporate-secretarial/${encodeURIComponent(activeFiling.fileName)}`}
                  download
                  className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold no-underline"
                  style={{
                    background: "var(--card-inner)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveFiling(null)}
                  aria-label="Close PDF viewer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background: "var(--card-inner)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  autoFocus
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe
              src={`/corporate-secretarial/${encodeURIComponent(activeFiling.fileName)}#toolbar=1&navpanes=0`}
              title={`${activeFiling.title} FY ${activeFiling.year} PDF preview`}
              className="h-full w-full flex-1 bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
