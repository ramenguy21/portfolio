import type { ReactNode, MouseEventHandler } from "react";

// Button Props
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

// Reusable Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2";
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
