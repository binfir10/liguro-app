
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("login");
  };
  return (
    <section>
      {
        user ? (
          <div>
            <h1>Welcome, {user.email}!</h1>
            <form
              action={signOut}
              className="hover:underline flex items-center gap-1 justify-center tracking-wide font-light">
              <button className="hover:underline">Cerrar Sesion</button>
            </form>
          </div>
          ) : (
            <div>
              <h1>You are not logged in.</h1>
              <Link href="/login">Incia Sesion</Link>
            </div>
            )

      }
  
    </section>
  );
}
