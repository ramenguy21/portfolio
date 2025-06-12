import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useBlogPosts } from "../utils/useBlogPosts";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-blue-500 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-1 rounded text-sm">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),
};

const Blog: React.FC = () => {
  const posts = useBlogPosts();
  const [selected, setSelected] = useState<string | null>(null);

  if (!posts.length) return <div className="text-center py-12">Loading...</div>;

  const selectedPost = posts.find((p) => p.slug === selected) || posts[0];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Blog
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/3">
            <ul>
              {posts.map((post) => (
                <li key={post.slug}>
                  <button
                    className={`w-full text-left py-2 px-4 rounded mb-2 ${
                      selectedPost.slug === post.slug
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelected(post.slug)}
                  >
                    {post.title}
                    <div className="text-xs text-gray-500">{post.date}</div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <article className="md:w-2/3 bg-gray-50 rounded-xl p-6 shadow">
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
