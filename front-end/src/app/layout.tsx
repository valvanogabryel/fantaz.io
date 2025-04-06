import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MusicProvider } from "@/contexts/MusicContext";
import MusicControls from "@/components/music-controls";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fantaz.io",
  description: "Fera demais cara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${ptSans.variable}`} suppressHydrationWarning>
      <body className="antialiased relative" cz-shortcut-listen="true"> 
        <SidebarProvider>
          <AppSidebar />
          <div className="texture" />

          <main className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-screen">
            <div>
              <SidebarTrigger />
            </div>
            <MusicProvider>
              {children}
              <MusicControls/>
            </MusicProvider>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}