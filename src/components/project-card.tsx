import { ExternalLink, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./button";

// Project Card Props
type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  impact?: string;
};

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
  impact,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          {link && (
            <Button variant="outline" href={link} className="p-2 shrink-0">
              <ExternalLink size={16} />
            </Button>
          )}
        </div>

        <p className="text-neutral-400 mb-4 flex-grow">{description}</p>

        {impact && (
          <div className="flex items-center gap-2 mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
            <TrendingUp size={16} />
            <span>{impact}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-neutral-800/50 text-cyan-400 border border-neutral-700/50 rounded-lg text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
