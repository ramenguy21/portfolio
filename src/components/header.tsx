import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavItem = {
  href: string;
  label: string;
  download?: boolean;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/m_Hamza_Asad_Resume.pdf", label: "Download CV", download: true },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate("/")}
            className="font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 cursor-pointer hover:from-cyan-300 hover:to-emerald-300 transition-all duration-300"
          >
            Muhammad Hamza Asad
          </div>
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) =>
              item.label === "Blog" ? (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-cyan-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-cyan-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                  download={item.download || undefined}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
          <button
            className="md:hidden text-neutral-300 hover:text-cyan-400 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800/50">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-neutral-300 hover:text-cyan-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
                download={item.download || undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
