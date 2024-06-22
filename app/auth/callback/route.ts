import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
 revalidatePath('/');

  // Constructs the URL to redirect to after the sign in process completes
  const redirectTo = new URL('/', origin);

  return NextResponse.redirect(redirectTo);
}
