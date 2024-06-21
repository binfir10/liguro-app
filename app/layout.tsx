import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-providers";
import Navbar from "@/components/navbar";

const firacode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liguro",
  description: "App de tareas y categorias para el dia a dia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${firacode.className} min-h-screen`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
          <main className="flex flex-col items-center justify-between flex-1">

        {children}
        </main >

      </ThemeProvider>
        </body>
    </html>
  );
}
