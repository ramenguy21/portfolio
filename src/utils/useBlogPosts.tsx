import { useEffect, useState } from "react";
import fm from "front-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Import all markdown files from /src/blog
    const files = import.meta.glob("/src/blog/*.md", {
      query: "?raw",
      import: "default",
    });

    Promise.all(
      Object.entries(files).map(async ([path, resolver]) => {
        const raw = (await resolver()) as string;
        const { attributes, body } = fm(raw) as {
          attributes: { title?: string; date?: string };
          body: string;
        };
        const slug = path.split("/").pop()?.replace(".md", "") || "";
        return {
          slug,
          title: attributes.title || slug,
          date: attributes.date
            ? new Date(attributes.date).toLocaleDateString()
            : "",
          content: body,
        } as BlogPost;
      })
    ).then((allPosts) => {
      // Sort by date descending
      setPosts(allPosts.sort((a, b) => (a.date < b.date ? 1 : -1)));
    });
  }, []);

  return posts;
}
