import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <h1>You are not logged in.</h1>
        <Link href="/login">Inicia Sesion</Link>
      </div>
    );
  }
  return (
    <>
    {children}
    </>
  );
}
