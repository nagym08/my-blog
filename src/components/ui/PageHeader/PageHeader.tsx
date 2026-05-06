import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  trailing?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  trailing,
  className,
}: PageHeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
