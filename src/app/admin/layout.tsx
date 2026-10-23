import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(
      ADMIN_SESSION_COOKIE
    )?.value;

  if (!verifyAdminSessionToken(token)) {
    redirect("/auth");
  }

  return children;
}