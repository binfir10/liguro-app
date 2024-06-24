import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "@/lib/actions";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex flex-col gap-16 break-words items-center justify-center py-10">
      {user ? (
        <div className="flex flex-col">
          <span className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center lg:text-5xl text-balance ">
            Bienvenido
            <h2 className="bg-accent p-3 py-2 rounded-xl tracking-wider">
              {user.user_metadata.full_name.toUpperCase()}!
            </h2>
          </span>

          <form
            action={signOut}
            className="mt-2 flex items-center gap-1 justify-center tracking-wide font-light">
            <Button className="" variant={"link"}>
              Cerrar Sesion
            </Button>
          </form>
        </div>
      ) : (
          <div className="flex flex-col px-2 items-center">
            <span className="scroll-m-20 text-4xl font-extrabold tracking-tight w-full text-center lg:text-5xl text-balance ">
              Bienvenido a
              <h2 className="bg-accent p-3 py-2 rounded-xl tracking-wider">
                Liguro
              </h2>
            </span>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center my-4">
              Take control of your tasks and achieve your goals with Task Manager. Organize, prioritize, and stay on track with our intuitive app. Get started now!
            </p>
            <Link href="/auth" className={`${buttonVariants({variant: "default"})}mt-2 flex items-center gap-1 justify-center tracking-wide font-light`}>Incia Sesion</Link>
        </div>
      )}
      <Image
        src={"/task-bg.svg"}
        alt="task image"
        width={500}
        height={500}
        className="w-96"
      />
    </section>
  );
}
