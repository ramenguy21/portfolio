import type { ReactNode } from "react";

// Card Props
type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

// Reusable Card Component
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 ${
        hover ? "hover:shadow-xl transition-shadow duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
