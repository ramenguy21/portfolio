import { useEffect, useState } from "react";
import fm from "front-matter";

export type CaseStudy = {
  slug: string;
  title: string;
  date: string;
  content: string;
  /** Dossier fields — used by the Selected work section on the home page. */
  order: number;
  year: string;
  stack: string;
  blurb: string;
  caption: string;
  image?: string;
  tags: string[];
};

type CaseStudyAttributes = {
  title?: string;
  date?: string;
  order?: number;
  year?: string;
  stack?: string;
  blurb?: string;
  caption?: string;
  image?: string;
  tags?: string[];
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
          attributes: CaseStudyAttributes;
          body: string;
        };
        const slug = path.split("/").pop()?.replace(".md", "") || "";
        return {
          slug,
          title: attributes.title || slug,
          date: attributes.date
            ? new Date(attributes.date).toISOString()
            : "",
          content: body,
          order: attributes.order ?? Number.MAX_SAFE_INTEGER,
          year: attributes.year || "",
          stack: attributes.stack || "",
          blurb: attributes.blurb || "",
          caption: attributes.caption || "",
          image: attributes.image,
          tags: attributes.tags ?? [],
        } as CaseStudy;
      }),
    ).then((allStudies) => {
      // Dossier order is editorial, set per-file in frontmatter.
      setStudies(allStudies.sort((a, b) => a.order - b.order));
    });
  }, []);

  return studies;
}
