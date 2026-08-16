import React, { type ReactNode } from "react";
import Masthead from "./header";
import Footer from "./footer";

type PageFrameProps = {
  children: ReactNode;
  /** The ticker sits directly under the name bar on the home page only. */
  banner?: ReactNode;
};

/**
 * The printed sheet, run edge to edge. Structure comes from the horizontal
 * rules rather than an outer border. Every route renders inside one of these.
 */
const PageFrame: React.FC<PageFrameProps> = ({ children, banner }) => (
  <div className="min-h-screen bg-paper">
    <div className="flex min-h-screen w-full flex-col bg-paper text-ink">
      <Masthead />
      {banner}
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  </div>
);

export default PageFrame;
