import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 mb-8 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Briefcase size={16} />
              </div>
              <h3 className="text-xl font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors duration-300">
                {title}
              </h3>
            </div>
            <p className="text-cyan-400 font-medium">{company}</p>
          </div>
          <span className="text-neutral-500 font-medium mt-2 md:mt-0 text-sm px-3 py-1 rounded-lg bg-neutral-800/50 border border-neutral-700/50 whitespace-nowrap">
            {period}
          </span>
        </div>
        <ul className="text-neutral-400 mb-4 space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {technologies && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 rounded-lg text-sm font-medium hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
