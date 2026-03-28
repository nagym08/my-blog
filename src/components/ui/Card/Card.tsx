import clsx from "clsx";
import { Tag, type TagColor } from "../Tag/Tag";
import { ReadMoreLink } from "../ReadMoreLink/ReadMoreLink";
import styles from "./Card.module.css";

export interface CardTag {
  label: string;
  color?: TagColor;
}

export interface CardProps {
  variant?: "featured" | "standard";
  image?: { src: string; alt: string };
  tags?: CardTag[];
  title: string;
  description?: string;
  date: string;
  href: string;
  className?: string;
}

export function Card({
  variant = "standard",
  image,
  tags,
  title,
  description,
  date,
  href,
  className,
}: CardProps) {
  return (
    <article className={clsx(styles.card, styles[variant], className)}>
      {variant === "featured" && image && (
        <div className={styles.imageWrapper}>
          <img src={image.src} alt={image.alt} className={styles.image} />
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      )}

      <h3 className={styles.title}>
        <a href={href} className={styles.titleLink}>
          {title}
        </a>
      </h3>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.meta}>
        <span className={styles.date}>{date}</span>
        <ReadMoreLink href={href} />
      </div>
    </article>
  );
}
