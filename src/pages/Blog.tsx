import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Blog from "../components/blog";

const BlogPage: React.FC = () => {
  const { slug } = useParams();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col">
        <Blog initialSlug={slug} />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
