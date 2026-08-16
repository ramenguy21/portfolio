import React from "react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../utils/useCaseStudies";

type DossierProps = {
  study: CaseStudy;
  index: number;
};

const Spec: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="font-mono text-[10px] text-ink-faint">{label}</div>
    <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase">
      {value}
    </div>
  </div>
);

const Dossier: React.FC<DossierProps> = ({ study, index }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/case-study/${study.slug}`}
      className="block border-b border-rule gutter py-10 transition-colors duration-[120ms] hover:bg-paper-hover desk:grid desk:grid-cols-[64px_1fr_minmax(360px,30%)] desk:gap-7"
    >
      <div
        aria-hidden
        className="hidden font-serif text-[44px] leading-[0.8] text-accent desk:block"
      >
        {number}
      </div>

      <div>
        <h3 className="font-display text-[28px] leading-[1.08] font-semibold tracking-[-0.025em] desk:text-[36px]">
          <span aria-hidden className="mr-3 font-serif text-accent desk:hidden">
            {number}
          </span>
          {study.title}
        </h3>

        <p className="mt-4 max-w-[46ch] font-mono text-[14px] leading-[1.7] text-pretty xl:max-w-[56ch]">
          {study.blurb}
        </p>

        {/* minmax(0,auto) so a long stack string wraps instead of widening
            the page on narrow screens. */}
        <div className="mt-[22px] grid grid-cols-[repeat(2,minmax(0,auto))] justify-start gap-10 border-t border-rule pt-[14px]">
          <Spec label="Year" value={study.year} />
          <Spec label="Stack" value={study.stack} />
        </div>
      </div>

      {/* 12:7 is the design's 360×210 slot, held as the column grows. */}
      <div className="relative mt-6 aspect-[16/9] border border-ink desk:mt-0 desk:aspect-[12/7]">
        {study.image ? (
          <img
            src={study.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="stripe h-full w-full" />
        )}
        <span className="absolute bottom-3 left-3 bg-ink px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-paper uppercase">
          {study.caption}
        </span>
      </div>
    </Link>
  );
};

export default Dossier;
