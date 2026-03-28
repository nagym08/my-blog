import clsx from "clsx";
import styles from "./Footer.module.css";

export interface FooterProps {
  copyrightYear?: number;
  siteName?: string;
  className?: string;
}

export function Footer({
  copyrightYear = new Date().getFullYear(),
  siteName = "My Blog",
  className,
}: FooterProps) {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        <p>
          &copy; {copyrightYear} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
