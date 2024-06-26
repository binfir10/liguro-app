import { SubmitButton } from "@/components/button-submit";
import { signIn, signWithGoogle } from "@/lib/actions/auth-actions";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className=" flex flex-col w-full justify-center gap-2 text-foreground border p-5 rounded-lg border-foreground/10 bg-card shadow-lg max-md:mt-14">
      <h3 className="text-2xl font-bold text-foreground/90 text-balance mb-6">
        Ingresa con tu cuenta
      </h3>
      <form>
        <SubmitButton
          formAction={signWithGoogle}
          className="flex justify-center gap-4 px-4 py-2 w-full items-center mb-2"
          pendingText="Signing Up...">
          <Image
            src="/google.png"
            alt="google"
            width={300}
            height={300}
            className="size-4"
          />
          Iniciar con Google
        </SubmitButton>
      </form>

      <Separator className="mb-5 mt-3 bg-border" decorative />

      <form className="flex flex-col justify-center gap-4 text-foreground ">
        <div className="flex flex-col w-full gap-1">
          <Label>Email</Label>
          <Input name="email" placeholder="you@example.com" required />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <SubmitButton
          formAction={signIn}
          className=""
          pendingText="Iniciando Sesion...">
          Iniciar Sesion
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
