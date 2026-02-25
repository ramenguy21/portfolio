import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useCaseStudies } from "../utils/useCaseStudies";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={
        "text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </h1>
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={
        "text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-200 mb-4 mt-8" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </h2>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className={
        "text-lg sm:text-xl md:text-2xl font-semibold text-neutral-300 mb-3 mt-6" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </h3>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={
        "text-neutral-400 mb-4 leading-relaxed text-sm sm:text-base" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </p>
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className={
        "list-disc list-inside mb-4 text-neutral-400 space-y-2" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </ul>
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className={
        "list-decimal list-inside mb-4 text-neutral-400 space-y-2" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </ol>
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className={
        "mb-1 text-sm sm:text-base" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </li>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className={
        (props.className ? props.className + " " : "") +
        "text-cyan-400 underline hover:text-cyan-300 transition-colors duration-200"
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={`px-1.5 py-0.5 rounded bg-neutral-800 text-cyan-400 text-sm${
        props.className ? " " + props.className : ""
      }`}
    >
      {props.children}
    </code>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className={
        "bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg p-4 overflow-x-auto mb-4 text-sm" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </pre>
  ),
};

type CaseStudyProps = { initialSlug?: string };
const CaseStudy: React.FC<CaseStudyProps> = ({ initialSlug }) => {
  const studies = useCaseStudies();
  const [selected, setSelected] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    if (initialSlug) setSelected(initialSlug);
  }, [initialSlug]);

  if (!studies.length)
    return <div className="text-center py-12 text-neutral-400">Loading...</div>;
  const selectedStudy = studies.find((s) => s.slug === selected) || studies[0];

  return (
    <section
      id="case-studies"
      className="py-16 sm:py-20 bg-neutral-950 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
          Case Studies
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
              <ul className="space-y-2">
                {studies.map((study) => (
                  <li key={study.slug}>
                    <Link
                      to={`/case-study/${study.slug}`}
                      className={`block text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                        selectedStudy.slug === study.slug
                          ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 font-semibold"
                          : "text-neutral-400 hover:text-neutral-300 border border-neutral-800/30 hover:border-neutral-700/50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{study.title}</span>
                        <span className="text-xs opacity-75 mt-1">
                          {study.date}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className="lg:w-2/3">
            <article className="prose prose-invert max-w-none">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
                  {selectedStudy.title}
                </h1>
                <p className="text-neutral-500 text-sm">{selectedStudy.date}</p>
              </div>
              <ReactMarkdown
                components={markdownComponents}
                remarkPlugins={[remarkGfm]}
              >
                {selectedStudy.content}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
