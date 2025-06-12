import Card from "./card";

// Experience Card Props
type ExperienceCardProps = {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
};

// Experience Card Component
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  technologies,
}) => {
  return (
    <Card className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-blue-600 font-medium">{company}</p>
        </div>
        <span className="text-gray-500 font-medium mt-2 md:mt-0">{period}</span>
      </div>
      <ul className="text-gray-600 mb-4 space-y-2">
        {description.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      {technologies && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ExperienceCard;
