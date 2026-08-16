import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./section-header";
import { site } from "../data/site";
import { useBlogPosts } from "../utils/useBlogPosts";
import { formatShort } from "../utils/date";

/** Two facing columns: employment on the left, writing on the right. */
const Register: React.FC = () => {
  const posts = useBlogPosts();

  return (
    <div id="experience" className="grid border-b border-ink desk:grid-cols-2">
      <div className="border-b border-rule desk:border-b-0 desk:border-r">
        <SectionHeader tone="rule">Where I&rsquo;ve worked</SectionHeader>
        {site.experience.map((job, index) => (
          <div
            key={job.company}
            className={`gutter py-6 ${
              index < site.experience.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[21px] font-semibold">
                {job.company}
              </span>
              <span className="font-mono text-[11.5px] text-ink-faint">
                {job.period}
              </span>
            </div>
            <div className="mt-[6px] font-mono text-[12.5px] text-ink-muted">
              {job.role}
            </div>
          </div>
        ))}
      </div>

      <div>
        <SectionHeader tone="rule">Writing</SectionHeader>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={`flex min-h-[44px] items-baseline justify-between gap-5 gutter py-[18px] font-mono text-[14px] transition-colors duration-[120ms] hover:bg-paper-hover ${
              index < posts.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <span>{post.title}</span>
            <span className="whitespace-nowrap text-[11.5px] text-ink-faint">
              {formatShort(post.date)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Register;
