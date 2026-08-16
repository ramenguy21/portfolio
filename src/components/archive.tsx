import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionHeader from "./section-header";
import { markdownComponents } from "./markdown";
import { formatShort, formatMonthYear, formatLong } from "../utils/date";

export type ArchiveItem = {
  slug: string;
  title: string;
  date: string;
  content: string;
  /** Case studies carry these; blog posts don't. */
  tags?: string[];
};

type ArchiveProps = {
  label: string;
  /** Route prefix for an entry, e.g. "/blog". */
  basePath: string;
  items: ArchiveItem[];
  initialSlug?: string;
  /** Index dates: "short" (Jun 09) for a single year, "monthYear" across many. */
  indexDate?: "short" | "monthYear";
};

/**
 * The register pattern applied to long-form content: a ruled index down the
 * left, the selected piece set on the right.
 */
const Archive: React.FC<ArchiveProps> = ({
  label,
  basePath,
  items,
  initialSlug,
  indexDate = "short",
}) => {
  const formatIndexDate = indexDate === "monthYear" ? formatMonthYear : formatShort;
  const [selected, setSelected] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    if (initialSlug) setSelected(initialSlug);
  }, [initialSlug]);

  if (!items.length) {
    return (
      <div className="gutter py-16 font-mono text-[13px] tracking-[0.18em] text-ink-faint uppercase">
        Loading…
      </div>
    );
  }

  const current = items.find((item) => item.slug === selected) ?? items[0];

  return (
    <>
      <SectionHeader aside={`${items.length} entries`}>{label}</SectionHeader>

      {/* flex-1 so the index column's rule runs the full height of the sheet. */}
      {/* The index column absorbs the page gutter so its text measure stays
          constant as the gutter grows. */}
      <div className="grid flex-1 desk:grid-cols-[calc(var(--gutter)+300px)_1fr]">
        <nav
          aria-label={label}
          className="border-b border-rule desk:border-b-0 desk:border-r"
        >
          {items.map((item) => {
            const active = item.slug === current.slug;
            return (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                onClick={() => setSelected(item.slug)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[44px] flex-col justify-center border-b border-rule py-[18px] pr-7 transition-colors duration-[120ms] hover:bg-paper-hover ${
                  active
                    ? "border-l-2 border-l-accent bg-paper-hover pl-[calc(var(--gutter)-2px)]"
                    : "pl-[var(--gutter)]"
                }`}
              >
                <span className="font-mono text-[14px] leading-[1.5]">
                  {item.title}
                </span>
                <span className="mt-1 font-mono text-[11.5px] text-ink-faint">
                  {formatIndexDate(item.date)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* max-width includes the gutters, so the measure stays at ~74ch. */}
        <article className="max-w-[calc(74ch+var(--gutter)*2)] gutter py-10">
          <header className="mb-8 border-b border-rule pb-6">
            <h1 className="font-display text-[30px] leading-[1.08] font-semibold tracking-[-0.025em] desk:text-[36px]">
              {current.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
              <span>{formatLong(current.date)}</span>
              {current.tags?.map((tag) => (
                <React.Fragment key={tag}>
                  <span aria-hidden className="text-rule-faint">
                    ·
                  </span>
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </p>
          </header>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {current.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  );
};

export default Archive;
