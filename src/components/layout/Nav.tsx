import Link from "next/link";
import { AuthButton } from "./AuthButton";
import styles from "./Nav.module.css";

// test comment
export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          My Blog
        </Link>
        <div className={styles.right}>
          <ul className={styles.links}>
            <li>
              <Link href="/category/coding">Coding</Link>
            </li>
            <li>
              <Link href="/category/project">Projects</Link>
            </li>
            <li>
              <Link href="/category/developer-growth">Growth</Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
