import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Blog from "../components/blog";

const BlogPage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-1 flex flex-col">
      <Blog />
    </main>
    <Footer />
  </div>
);

export default BlogPage;
