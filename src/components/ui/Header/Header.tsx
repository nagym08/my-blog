import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { ExpandableSearch } from "@/components/ui/ExpandableSearch/ExpandableSearch";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import type { SearchItem } from "@/components/search/useArticleSearch";
import styles from "./Header.module.css";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  searchIndex?: SearchItem[];
  authContent?: ReactNode;
  className?: string;
}

export function Header({
  logo = "S&S",
  navItems = [],
  searchIndex,
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
          {searchIndex && <ExpandableSearch searchIndex={searchIndex} />}
          <ThemeToggle />
          {authContent}
        </div>
      </div>
    </header>
  );
}
