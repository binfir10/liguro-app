import Login from "@/components/auth-form/login-form";
import Register from "@/components/auth-form/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
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
    <section className="h-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px] shadow-lg shadow-foreground/70 border rounded-lg p-2">
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
