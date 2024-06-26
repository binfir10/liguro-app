import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth")
  }
  else{
    redirect("/categories")
  }

  return (
    <section className="flex flex-col gap-16 break-words items-center justify-center py-10">
  
    </section>
  );
}
