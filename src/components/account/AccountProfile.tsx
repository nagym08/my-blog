import { format } from "date-fns";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Tag } from "@/components/ui/Tag/Tag";
import styles from "./AccountProfile.module.css";

export interface AccountProfileProps {
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
}

export function AccountProfile({
  name,
  email,
  image,
  role,
  createdAt,
}: AccountProfileProps) {
  return (
    <section className={styles.card}>
      <div className={styles.avatar}>
        <Avatar src={image} name={name} size="lg" />
      </div>
      <div className={styles.info}>
        <div className={styles.headRow}>
          <h2 className={styles.name}>{name ?? "Unnamed reader"}</h2>
          <Tag label={role} color="default" />
        </div>
        {email && <p className={styles.email}>{email}</p>}
        <p className={styles.meta}>
          Member since {format(createdAt, "MMMM yyyy")}
        </p>
      </div>
    </section>
  );
}
