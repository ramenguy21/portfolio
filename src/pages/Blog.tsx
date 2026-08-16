import React from "react";
import { useParams } from "react-router-dom";
import PageFrame from "../components/page-frame";
import Archive from "../components/archive";
import { useBlogPosts } from "../utils/useBlogPosts";

const BlogPage: React.FC = () => {
  const { slug } = useParams();
  const posts = useBlogPosts();

  return (
    <PageFrame>
      <Archive label="Writing" basePath="/blog" items={posts} initialSlug={slug} />
    </PageFrame>
  );
};

export default BlogPage;
