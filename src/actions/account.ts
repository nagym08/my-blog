"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth, signOut } from "@/lib/auth";
import { users } from "@/db/schema";

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await db.delete(users).where(eq(users.id, session.user.id));
  await signOut({ redirectTo: "/" });
}
