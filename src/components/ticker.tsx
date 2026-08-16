import React from "react";
import { site } from "../data/site";

// One copy of the list, rendered twice back to back so translateX(-50%) loops
// seamlessly.
const Run: React.FC = () => (
  <span className="flex gap-[42px] pr-[42px]">
    {site.ticker.map((item) => (
      <React.Fragment key={item}>
        <span>{item}</span>
        <span>·</span>
      </React.Fragment>
    ))}
  </span>
);

const Ticker: React.FC = () => (
  <div
    aria-hidden
    className="overflow-hidden border-b border-ink bg-ink py-[7px] text-paper"
  >
    <div className="flex w-max animate-marquee font-mono text-[11px] tracking-[0.2em] uppercase">
      <Run />
      <Run />
    </div>
  </div>
);

export default Ticker;
