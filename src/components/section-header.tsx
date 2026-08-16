import React, { type ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
  /** Right-hand meta, e.g. a count. */
  aside?: ReactNode;
  id?: string;
  /** Structural edges use ink; headers inside a block use the hairline. */
  tone?: "ink" | "rule";
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  aside,
  id,
  tone = "ink",
}) => (
  <div
    id={id}
    className={`flex items-center justify-between gap-4 border-b gutter py-[14px] font-mono text-[11px] tracking-[0.18em] uppercase ${
      tone === "ink" ? "border-ink" : "border-rule"
    }`}
  >
    <h2>{children}</h2>
    {aside ? <span className="text-ink-faint">{aside}</span> : null}
  </div>
);

export default SectionHeader;
