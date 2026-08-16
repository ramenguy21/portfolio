import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageFrame from "./components/page-frame";
import Ticker from "./components/ticker";
import Button from "./components/button";
import Dossier from "./components/dossier";
import Register from "./components/register";
import ToolsIndex from "./components/tools-index";
import SectionHeader from "./components/section-header";
import { site } from "./data/site";
import { useCaseStudies } from "./utils/useCaseStudies";

const Hero: React.FC = () => {
  const [before, accent, after] = site.hero.headline;

  return (
    <section className="border-b border-ink px-7 pt-14 pb-12 desk:pt-[76px] desk:pb-16">
      <h1 className="max-w-[17ch] font-display text-[44px] leading-[0.95] font-extrabold tracking-[-0.04em] desk:text-[78px]">
        {before}
        <span className="font-serif font-normal tracking-[-0.01em] italic">
          {accent}
        </span>
        {after}
      </h1>

      <p className="mt-[26px] font-mono text-[13px] tracking-[0.06em] text-ink-muted uppercase">
        {site.hero.tagline}
      </p>

      <p className="mt-[30px] max-w-[62ch] font-mono text-[15.5px] leading-[1.75] text-pretty">
        {site.hero.body}
      </p>

      <div className="mt-[30px] flex flex-wrap items-center gap-x-[14px] gap-y-4">
        <Button href={`mailto:${site.email}`}>{site.hero.primaryCta}</Button>
        <Button href={site.cv} variant="secondary" download>
          {site.hero.secondaryCta}
        </Button>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const studies = useCaseStudies();
  const { hash } = useLocation();

  // BrowserRouter doesn't scroll to #hash on cross-route navigation.
  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <PageFrame banner={<Ticker />}>
      <Hero />

      <SectionHeader id="work">Selected work</SectionHeader>
      {studies.map((study, index) => (
        <Dossier key={study.slug} study={study} index={index} />
      ))}

      <Register />
      <ToolsIndex />
    </PageFrame>
  );
};

export default App;
