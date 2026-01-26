import type { ReactNode, MouseEventHandler } from "react";

// Button Props
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  download?: string | boolean;
};

// Reusable Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  download,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-emerald-500 text-neutral-950 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 font-semibold",
    secondary:
      "bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 hover:scale-105",
    outline:
      "border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:scale-105",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={download || undefined}
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
