import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, site, type NavItem } from "../data/site";

const linkPropsFor = (item: NavItem, onHome: boolean) => {
  if (item.href) {
    const external = item.href.startsWith("http");
    return {
      href: item.href,
      ...(item.download ? { download: true } : {}),
      ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    };
  }
  if (item.hash) return { href: onHome ? item.hash : `/${item.hash}` };
  return {};
};

const Masthead: React.FC = () => {
  const { pathname, hash } = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const onHome = pathname === "/";
  const isActive = (item: NavItem) => {
    if (item.to) return pathname.startsWith(item.to);
    if (item.hash) return onHome && (hash || "#work") === item.hash;
    return false;
  };

  const navClass = (active: boolean) =>
    [
      "border-b pb-[2px] transition-colors",
      active ? "border-ink" : "border-transparent hover:border-ink",
    ].join(" ");

  const renderNavItem = (
    item: NavItem,
    className: string,
    onClick?: () => void,
  ) =>
    item.to ? (
      <Link key={item.label} to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    ) : (
      <a
        key={item.label}
        {...linkPropsFor(item, onHome)}
        className={className}
        onClick={onClick}
      >
        {item.label}
      </a>
    );

  return (
    <header>
      {/* Masthead strip */}
      <div className="flex items-center justify-between border-b border-ink gutter py-3 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span>{site.masthead.location}</span>
        <span className="hidden sm:block">{site.masthead.tenure}</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-[6px] w-[6px] animate-pulse-dot rounded-full bg-accent"
          />
          {site.masthead.availability}
        </span>
      </div>

      {/* Name bar */}
      <div className="border-b-[3px] border-double border-ink gutter pt-[22px] pb-[18px]">
        <div className="flex flex-col items-start gap-4 desk:flex-row desk:items-end desk:justify-between desk:gap-10">
          <Link
            to="/"
            className="font-display text-[26px] leading-none font-extrabold tracking-[-0.03em] desk:text-[34px]"
          >
            {site.name}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden gap-[26px] font-mono text-[12px] tracking-[0.1em] uppercase desk:flex"
          >
            {navItems.map((item) =>
              renderNavItem(item, navClass(isActive(item))),
            )}
          </nav>

          <button
            type="button"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
            className="-mx-2 flex h-11 items-center px-2 font-mono text-[12px] tracking-[0.1em] uppercase desk:hidden"
          >
            <span className="border-b border-ink pb-[2px]">
              {mobileNavOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>

        {mobileNavOpen && (
          <nav
            aria-label="Primary"
            className="mt-4 flex flex-col border-t border-rule font-mono text-[13px] tracking-[0.1em] uppercase desk:hidden"
          >
            {navItems.map((item) =>
              renderNavItem(
                item,
                "flex min-h-[44px] items-center border-b border-rule",
                () => setMobileNavOpen(false),
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Masthead;
