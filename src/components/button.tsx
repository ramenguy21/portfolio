import React, { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  download?: boolean;
  className?: string;
};

const base = "font-mono text-[12px] tracking-[0.12em] uppercase";

const variants = {
  // Solid ink; the accent shows up on hover and nowhere else here.
  primary: `${base} inline-flex items-center bg-ink px-[22px] py-[13px] text-paper transition-colors hover:bg-accent`,
  secondary: `${base} inline-flex items-center border-b border-ink pb-[3px] min-h-[44px] desk:min-h-0`,
} as const;

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = "primary",
  download,
  className = "",
}) => {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${variants[variant]} ${className}`.trim()}
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

export default Button;
