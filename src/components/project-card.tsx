import { ExternalLink } from "lucide-react";
import Button from "./button";
import Card from "./card";

// Project Card Props
type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
}) => {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {link && (
          <Button variant="outline" href={link} className="p-2">
            <ExternalLink size={16} />
          </Button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;
