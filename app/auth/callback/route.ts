import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

if (code) {
    const supabase = createClient();
    const { data} = await supabase.auth.exchangeCodeForSession(code);
    
    const { data: { user } } = await supabase.auth.getUser();

    // Guardar los datos del usuario en una tabla en Supabase
    const {data: abs, error } = await supabase
      .from('users')
      .insert({
        id: user?.id,
        email: user?.email,
        name: user?.user_metadata?.full_name,
        // Agregar otros campos que desees guardar
      });

    if (error) {
      console.error(error);
    } else {
      console.log(`Usuario creado con éxito: ${data}`);
    }
  }

  return NextResponse.redirect(`${origin}/categories`);
}
