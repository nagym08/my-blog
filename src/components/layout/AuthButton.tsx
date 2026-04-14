import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { UserMenu } from "./UserMenu";

export async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button variant="primary" size="sm" tabIndex={-1}>
          Sign In
        </Button>
      </Link>
    );
  }

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <UserMenu
      name={session.user.name}
      image={session.user.image}
      signOutAction={signOutAction}
    />
  );
}
