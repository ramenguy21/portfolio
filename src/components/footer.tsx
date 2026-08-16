import React from "react";
import { site } from "../data/site";

const Footer: React.FC = () => (
  <footer
    id="contact"
    className="bg-ink gutter pt-[72px] pb-10 text-paper"
  >
    <div className="flex flex-col items-start justify-between gap-10 desk:flex-row desk:items-end">
      <h2 className="max-w-[14ch] font-display text-[38px] leading-[0.95] font-extrabold tracking-[-0.035em] desk:text-[64px]">
        {site.footer.headline}
      </h2>

      <div className="font-mono text-[13px] leading-[2] desk:text-right">
        <a
          href={`mailto:${site.email}`}
          className="inline-block border-b border-rule-dark pb-[6px] transition-colors hover:border-paper"
        >
          {site.email}
        </a>
        <div className="mt-2 opacity-55">{site.footer.note}</div>
      </div>
    </div>

    <div className="mt-14 flex flex-col gap-3 border-t border-rule-dark pt-4 font-mono text-[10.5px] tracking-[0.16em] uppercase opacity-55 desk:flex-row desk:justify-between desk:gap-0">
      <span>{site.footer.copyright}</span>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] items-center desk:min-h-0"
      >
        GitHub
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] items-center desk:min-h-0"
      >
        LinkedIn
      </a>
      <span>{site.footer.colophon}</span>
    </div>
  </footer>
);

export default Footer;
