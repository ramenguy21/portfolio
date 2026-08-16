import React from "react";
import { useParams } from "react-router-dom";
import PageFrame from "../components/page-frame";
import Archive from "../components/archive";
import { useCaseStudies } from "../utils/useCaseStudies";

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams();
  const studies = useCaseStudies();

  return (
    <PageFrame>
      <Archive
        label="Case studies"
        basePath="/case-study"
        items={studies}
        initialSlug={slug}
        indexDate="monthYear"
      />
    </PageFrame>
  );
};

export default CaseStudyPage;
