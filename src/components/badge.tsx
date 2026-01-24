import type { ElementType } from "react";

// Skill Badge Props
type SkillBadgeProps = {
  skill: string;
  icon?: ElementType;
};

// Skill Badge Component
const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700/50 px-4 py-2 rounded-lg hover:border-cyan-500/30 hover:bg-neutral-800 transition-all duration-200">
      {Icon && <Icon size={16} className="text-cyan-400" />}
      <span className="text-neutral-300 font-medium">{skill}</span>
    </div>
  );
};

export default SkillBadge;
