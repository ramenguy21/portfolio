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
        "text-3xl md:text-4xl font-bold text-blue-700 mb-4" +
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
        "text-2xl md:text-3xl font-semibold text-blue-600 mb-3" +
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
        "text-xl md:text-2xl font-semibold text-blue-500 mb-2" +
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
        "text-gray-700 mb-4 leading-relaxed" +
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
        "list-disc list-inside mb-4 text-gray-700" +
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
        "list-decimal list-inside mb-4 text-gray-700" +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </ol>
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className={"mb-1" + (props.className ? " " + props.className : "")}
    >
      {props.children}
    </li>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className={
        (props.className ? props.className + " " : "") +
        "text-blue-600 underline hover:text-blue-800"
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
      className={`px-1 rounded text-sm${
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
        "bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto mb-4" +
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
  //const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    if (initialSlug) setSelected(initialSlug);
  }, [initialSlug]);

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
                  <Link
                    to={`/blog/${post.slug}`}
                    className={`w-full block text-left py-2 px-4 rounded mb-2 ${
                      selectedPost.slug === post.slug
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelected(post.slug)}
                  >
                    {post.title}
                    <div className="text-xs text-gray-500">{post.date}</div>
                  </Link>
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
