import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import { ViewTransitions } from "next-view-transitions";
import { redirect } from "next/navigation";

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
    redirect("/auth");
  }
  return (
    <ViewTransitions>

      <Navbar />

    <section className="max-w-5xl w-full">
    {children}
      <Toaster />

    </section>
    </ViewTransitions>
  );
}
