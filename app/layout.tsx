import { ThemeProvider } from "@/components/theme-providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions'
const firacode = Fira_Code({ subsets: ["latin"], weight:["300","400","500","600","700"] });

const APP_NAME = "Liguro";
const APP_DEFAULT_TITLE = "Liguro";
const APP_TITLE_TEMPLATE = "%s - LIG App";
const APP_DESCRIPTION = "TaskList App";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#030202",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>

    <html lang="es" suppressHydrationWarning>
      <body className={`${firacode.className} min-h-dvh`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <main className="flex flex-col items-center justify-center">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
            </ViewTransitions>
  );
}
