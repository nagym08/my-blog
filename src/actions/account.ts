"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth, signOut } from "@/lib/auth";
import { users } from "@/db/schema";

export type DeleteAccountState = { error: string } | null;

export async function deleteAccount(): Promise<DeleteAccountState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Your session has expired. Sign in again to delete your account." };
  }

  try {
    await db.delete(users).where(eq(users.id, session.user.id));
  } catch {
    return { error: "Could not delete your account. Please try again." };
  }

  await signOut({ redirectTo: "/" });
  return null;
}
