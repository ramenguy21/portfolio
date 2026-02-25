import { useEffect, useState } from "react";
import fm from "front-matter";

export type CaseStudy = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export function useCaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    // Import all markdown files from /src/case-studies
    const files = import.meta.glob("/src/case-studies/*.md", {
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
        } as CaseStudy;
      }),
    ).then((allStudies) => {
      // Sort by date descending
      setStudies(allStudies.sort((a, b) => (a.date < b.date ? 1 : -1)));
    });
  }, []);

  return studies;
}
