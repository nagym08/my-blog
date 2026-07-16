import clsx from "clsx";
import styles from "./Tag.module.css";

export type TagColor =
  | "typescript"
  | "backend"
  | "api"
  | "css-design"
  | "dev-growth"
  | "frontend"
  | "life"
  | "default";

export interface TagProps {
  label: string;
  color?: TagColor;
  className?: string;
}

export function Tag({ label, color = "default", className }: TagProps) {
  return (
    <span className={clsx(styles.tag, styles[color], className)}>{label}</span>
  );
}
