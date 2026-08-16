import React from "react";

/** Paper-theme prose. Shared by blog posts and case studies. */
export const markdownComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="mt-10 mb-6 font-display text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] first:mt-0 desk:text-[36px]"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mt-10 mb-4 border-t border-rule pt-6 font-display text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] first:mt-0 first:border-t-0 first:pt-0 desk:text-[26px]"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mt-8 mb-3 font-display text-[18px] leading-[1.2] font-semibold desk:text-[20px]"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="mb-5 font-mono text-[15.5px] leading-[1.75] text-pretty"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="mb-5 list-disc space-y-2 pl-5 font-mono text-[15px] marker:text-ink-faint"
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="mb-5 list-decimal space-y-2 pl-5 font-mono text-[15px] marker:text-ink-faint"
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-[1.7]" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="font-serif text-[1.05em] italic" />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = !!href && /^https?:/.test(href);
    return (
      <a
        {...props}
        href={href}
        className="border-b border-accent transition-colors hover:bg-paper-hover"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      />
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="bg-paper-shade px-[6px] py-[2px] text-[14px]" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="mb-5 overflow-x-auto bg-ink p-4 font-mono text-[13px] leading-[1.7] text-paper [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mb-5 border-l-[3px] border-rule-faint pl-5 text-ink-muted"
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      loading="lazy"
      className="my-8 block w-full border border-ink"
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="my-10 border-t border-rule" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="mb-5 overflow-x-auto">
      <table {...props} className="w-full border-collapse font-mono text-[13px]" />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-ink py-2 pr-6 text-left text-[11px] tracking-[0.08em] text-ink-faint uppercase"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border-b border-rule py-2 pr-6 align-top" />
  ),
};
