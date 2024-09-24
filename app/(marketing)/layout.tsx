import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Logo from "./components/logo";

export const metadata: Metadata = {
  title: "Poool Party",
  description: "Automate your Venmo requests",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}