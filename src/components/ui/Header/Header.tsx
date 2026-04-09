import clsx from "clsx";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  isSignedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onSignIn?: () => void;
  onSignOut?: () => void;
  className?: string;
}

export function Header({
  logo = "S&S",
  navItems = [],
  isSignedIn = false,
  userName,
  userAvatar,
  onSignIn,
  onSignOut,
  className,
}: HeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          {logo}
        </a>

        {navItems.length > 0 && (
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className={styles.actions}>
          {isSignedIn ? (
            <>
              {userName && <span className={styles.userName}>{userName}</span>}
              {userAvatar && (
                <img
                  src={userAvatar}
                  alt={userName || "User avatar"}
                  className={styles.avatar}
                />
              )}
              <Button variant="secondary" size="sm" onClick={onSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="sm" onClick={onSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
