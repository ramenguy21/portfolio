import { motion } from "framer-motion";
import { Code2, Database, Cloud, Layers, Terminal, Globe } from "lucide-react";

interface BentoBoxProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className?: string;
}

const BentoBox = ({ title, items, icon, className = "" }: BentoBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 
        border border-neutral-800/50 p-6 hover:border-cyan-500/30 transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-sm rounded-lg bg-neutral-800/50 text-neutral-300 
                border border-neutral-700/50 hover:border-cyan-500/30 hover:text-cyan-400 
                transition-all duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const BentoGrid = () => {
  const techCategories = [
    {
      title: "Backend",
      icon: <Terminal size={20} />,
      items: ["GoLang", "Node.js", "Express", "Python", "Django"],
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Frontend",
      icon: <Code2 size={20} />,
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Svelte"],
      className: "md:col-span-2",
    },
    {
      title: "Database",
      icon: <Database size={20} />,
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
      className: "md:col-span-1",
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud size={20} />,
      items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
      className: "md:col-span-2",
    },
    {
      title: "Architecture",
      icon: <Layers size={20} />,
      items: ["Microservices", "REST APIs", "WebSockets", "CI/CD"],
      className: "md:col-span-1",
    },
    {
      title: "Tools",
      icon: <Globe size={20} />,
      items: ["Git", "Linux", "Postman", "VS Code", "Figma"],
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
      {techCategories.map((category, idx) => (
        <BentoBox
          key={idx}
          title={category.title}
          items={category.items}
          icon={category.icon}
          className={category.className}
        />
      ))}
    </div>
  );
};
