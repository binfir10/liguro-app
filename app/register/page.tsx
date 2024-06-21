import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/button-submit";



export default async function Register({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }

    const signWithGoogle = async () => {
        "use server";
        const origin = headers().get('origin');
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });
        if (error) {
            console.error(error);
            // Handle error appropriately
            return;
        }
        if (data?.url) {
            return redirect(data.url);
        }
    }

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,


            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/register?message=Could not authenticate user");
        } else {
            return redirect("/dashboard");
        }

    };

    return (
        <section className=" w-screen flex justify-center ">
            <Link
                href="/"
                className="py-2 px-4 absolute left-10 top-6 lg:left-36  max-sm:left-5 rounded-md no-underline text-foreground bg-secondary hover:bg-accent/70 flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Volver a Inicio
            </Link>
            <div className="flex flex-col w-full px-8 mt-14 max-w-md justify-center gap-2">


                <div className="animate-in flex flex-col w-full justify-center gap-2 text-foreground border p-5 rounded-lg border-foreground/10 bg-card shadow-lg max-md:mt-14">
                <h3 className="text-2xl font-bold text-foreground/90 text-balance mb-6">Crea tu cuenta</h3>
                <form action="">
                    <SubmitButton
                        formAction={signWithGoogle}
                        className="border border-foreground/20 rounded-md w-full flex items-center justify-center gap-4 px-4 py-2 text-foreground mb-2 hover:bg-btn-background-hover/40"
                        pendingText="Signing Up..."
                        >
                        {/*<FcGoogle className="w-6 h-6" />*/}
                        Iniciar con Google
                    </SubmitButton>
                </form>

                {/*<Separator className="my-3 bg-foreground/10" decorative />*/}

                <form className="flex flex-col justify-center gap-2 text-foreground ">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 focus:outline-none focus:bg-btn-background-hover/40"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 focus:outline-none focus:bg-btn-background-hover/40"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        />

                    <SubmitButton
                        formAction={signUp}
                        className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-foreground mb-2"
                        pendingText="Registrando..."
                        >
                        Registrarse
                    </SubmitButton>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
                <span className="text-foreground/60 text-sm text-center" >Ya tenes una cuenta? <Link href="/login" className="text-foreground hover:underline hover:text-primary">Inicia Sesión</Link></span>
            </div>
        </div>
                    </section>
    );
}