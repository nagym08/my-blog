"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar/Avatar";

const UserSettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    <circle cx="19" cy="19" r="2" />
    <path d="M19 15v2M19 21v2M15 19h2M21 19h2" />
  </svg>
);

const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export interface UserMenuProps {
  name: string | null | undefined;
  image: string | null | undefined;
  signOutAction: () => Promise<void>;
}

export function UserMenu({ name, image, signOutAction }: UserMenuProps) {
  const router = useRouter();

  return (
    <Avatar
      src={image ?? null}
      name={name ?? ""}
      size="md"
      tooltip={name ?? undefined}
      menuItems={[
        {
          label: "Manage account",
          icon: <UserSettingsIcon />,
          onSelect: () => router.push("/account"),
        },
        {
          label: "Sign out",
          icon: <SignOutIcon />,
          onSelect: () => {
            void signOutAction();
          },
          variant: "danger",
        },
      ]}
    />
  );
}
