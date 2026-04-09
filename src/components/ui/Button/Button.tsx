import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "inverted" | "outlined";
export type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type StandardButtonProps = BaseButtonProps & {
  iconOnly?: false;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

/**
 * Icon-only buttons strip visible text, so an accessible name must be supplied
 * via `aria-label` or `aria-labelledby`. `leftIcon` / `rightIcon` are forbidden
 * in this mode — `children` should be the icon.
 */
type IconOnlyButtonProps = BaseButtonProps & {
  iconOnly: true;
  leftIcon?: never;
  rightIcon?: never;
} & ({ "aria-label": string } | { "aria-labelledby": string });

export type ButtonProps = StandardButtonProps | IconOnlyButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    iconOnly = false,
    className,
    children,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        className,
      )}
      {...rest}
    >
      {!iconOnly && leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {iconOnly ? (
        <span className={styles.icon}>{children}</span>
      ) : (
        children && <span className={styles.label}>{children}</span>
      )}
      {!iconOnly && rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
