import type { ElementType } from "react";

// Skill Badge Props
type SkillBadgeProps = {
  skill: string;
  icon?: ElementType;
};

// Skill Badge Component
const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
      {Icon && <Icon size={16} className="text-blue-600" />}
      <span className="text-gray-700 font-medium">{skill}</span>
    </div>
  );
};

export default SkillBadge;
