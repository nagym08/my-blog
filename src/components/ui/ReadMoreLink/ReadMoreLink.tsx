import clsx from "clsx";
import styles from "./ReadMoreLink.module.css";

export interface ReadMoreLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function ReadMoreLink({
  href,
  label = "Read More",
  className,
}: ReadMoreLinkProps) {
  return (
    <a href={href} className={clsx(styles.link, className)}>
      {label}
      <span className={styles.arrow} aria-hidden>
        &rarr;
      </span>
    </a>
  );
}
