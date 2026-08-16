import React from "react";
import SectionHeader from "./section-header";
import { site } from "../data/site";

/**
 * Not in the 2a prototype — it carries the tech-stack copy the old bento grid
 * held, set as another register block rather than a card wall.
 */
const ToolsIndex: React.FC = () => (
  <section className="border-b border-ink">
    <SectionHeader tone="rule">Index of tools</SectionHeader>
    <dl>
      {site.tools.map((group, index) => (
        <div
          key={group.label}
          className={`grid gap-2 gutter py-[18px] desk:grid-cols-[180px_1fr] desk:gap-7 ${
            index < site.tools.length - 1 ? "border-b border-rule" : ""
          }`}
        >
          <dt className="font-mono text-[10px] tracking-[0.12em] text-ink-faint uppercase desk:pt-[3px]">
            {group.label}
          </dt>
          <dd className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[13px] text-ink-muted">
            {group.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default ToolsIndex;
