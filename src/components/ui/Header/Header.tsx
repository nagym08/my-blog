import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Header.module.css";

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  searchHref?: string;
  authContent?: ReactNode;
  className?: string;
}

export function Header({
  logo = "S&S",
  navItems = [],
  searchHref,
  authContent,
  className,
}: HeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {logo}
        </Link>

        {navItems.length > 0 && (
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className={styles.actions}>
          {searchHref && (
            <Link
              href={searchHref}
              className={styles.searchLink}
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
          )}
          {authContent}
        </div>
      </div>
    </header>
  );
}
