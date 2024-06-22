import Login from "@/components/auth-form/login-form";
import Register from "@/components/auth-form/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/categories");
  }

  return (
    <section>
      <Link
        href="/"
        className="py-2 px-4  rounded-md no-underline text-foreground   flex items-center text-sm">
        <ArrowLeft className="h-5" />
        Volver a Inicio
      </Link>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="register">
          <Register searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
