import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useBlogPosts } from "../utils/useBlogPosts";
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

type BlogProps = { initialSlug?: string };
const Blog: React.FC<BlogProps> = ({ initialSlug }) => {
  const posts = useBlogPosts();
  const [selected, setSelected] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    if (initialSlug) setSelected(initialSlug);
  }, [initialSlug]);

  if (!posts.length)
    return <div className="text-center py-12 text-neutral-400">Loading...</div>;
  const selectedPost = posts.find((p) => p.slug === selected) || posts[0];

  return (
    <section id="blog" className="py-16 sm:py-20 bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
          Blog
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className={`block text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                        selectedPost.slug === post.slug
                          ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 font-semibold"
                          : "bg-neutral-900/50 border border-neutral-800/50 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-700 hover:text-neutral-300"
                      }`}
                      onClick={() => setSelected(post.slug)}
                    >
                      <div className="text-sm sm:text-base">{post.title}</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {post.date}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <article className="lg:w-2/3 rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 sm:p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {selectedPost.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Blog;
