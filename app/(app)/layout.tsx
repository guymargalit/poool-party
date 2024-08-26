import { signOut } from "@/auth";
import { MainNav } from "@/components/main-nav";
import { RequestDialog } from "@/components/request-dialog";
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import { getUser } from "@/lib/actions/user";
import { getColorAndEmoji } from "@/lib/utils";
import "@/styles/globals.css";
import { LucidePlus } from "lucide-react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Poool Party",
  description: "Automate your Venmo requests",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const { emoji, color } = getColorAndEmoji(user?.email || "");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky z-10 w-full top-0 flex flex-col h-24 gap-4 border-b border-muted bg-background p-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <UserAccountNav user={user} />
        </div>
        <MainNav
          items={[
            {
              href: "/dashboard",
              title: "Pools",
            },
            {
              href: "/dashboard/transactions",
              title: "Transactions",
            },
          ]}
        />
      </header>
      {user.venmo ? (
        <div className="fixed z-10 bottom-4 right-4">
          <RequestDialog>
            <Button
              className={`flex items-center justify-center min-w-14 min-h-14 w-14 h-14 p-0 rounded-full text-background`}
            >
              <LucidePlus className="w-8 h-8" strokeWidth={3} />
            </Button>
          </RequestDialog>
        </div>
      ) : null
      // <div className="fixed z-10 bottom-0 w-full">
      //   <div className="py-4 px-6 bg-background border border-muted rounded-lg">
      //     <p className="text-base font-medium text-foreground">
      //       Link your Venmo account to start making requests.
      //     </p>
      //     <Button variant="venmo" className="mt-2 w-full">
      //       <svg className="h-4 w-4 fill-white mr-2" viewBox="0 0 20 20">
      //         <path d="M17.8403 0.77C18.5249 1.87835 18.8338 3.01961 18.8338 4.46184C18.8338 9.06059 14.8274 15.0349 11.5754 19.23H4.14835L1.17 1.77723L7.67325 1.17209L9.2479 13.5911C10.7198 11.242 12.5352 7.55014 12.5352 5.03327C12.5352 3.65605 12.2945 2.71704 11.9181 1.94497L17.8403 0.77Z"></path>
      //       </svg>
      //       Link Venmo
      //     </Button>
      //   </div>
      // </div>
      }
      <div className="flex min-h-screen w-full flex-col">{children}</div>
    </div>
  );
}

export const runtime = "edge";
