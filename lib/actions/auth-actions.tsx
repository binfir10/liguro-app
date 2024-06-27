"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const signWithGoogle = async () => {
  const origin = headers().get("origin");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error(error);
    return;
  }
  if (data?.url) {
    return redirect(data.url);
  }
};

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(
      "/auth?message=No se pudo iniciar sesión, Intenta de nuevo"
    );
  }

  return redirect("categories");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/auth?message=No se pudo registrar, intenta de nuevo");
  }

  await createUserProfile(data?.user?.id ?? "", email);

  return redirect("account");
};

async function createUserProfile(userId: string, email: string) {
  if (!userId) {
    console.error("Error: userId es nulo");
    return redirect("/auth?message=No se pudo crear el perfil de usuario");
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: userId, email: email, name: email.split("@")[0] }]);

  if (error) {
    console.error("Error al crear el perfil de usuario:", error.message);
    return redirect("/auth?message=Could not authenticate user");
  } else {
    console.log("Perfil de usuario creado:", data);
    return redirect("/account");
  }
}

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("auth");
};
