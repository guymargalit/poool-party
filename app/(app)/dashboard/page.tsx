import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { VenmoAuthForm } from "@/components/venmo-auth-form";
import { VenmoCard } from "@/components/venmo-card";
import { getUser } from "@/lib/actions/user";
import { X } from "lucide-react";
import PendingTransactions from "./components/pending-transactions";
import Pools from "./components/pools";

export default async function Home() {
  const user = await getUser();

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex-1 bg-background/80 flex flex-col items-center pt-0 p-2">
        <div className="w-full max-w-4xl p-2">
          {(!user.venmo?.accessToken ||
            (user?.venmo?.expiredAt &&
              user?.venmo?.expiredAt < new Date())) && (
            <Credenza dismissable={false}>
              <CredenzaTrigger className="w-full">
                <VenmoCard className="mt-2" />
              </CredenzaTrigger>
              <CredenzaContent className="rounded-none md:rounded-2xl h-screen md:h-auto">
                <CredenzaHeader className="flex flex-row justify-between items-center">
                  <div></div>
                  <CredenzaClose
                    style={{ marginTop: 0 }}
                    className="rounded-sm ring-offset-background transition-colors hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                  >
                    <X className="h-5 w-5" strokeWidth={4} />
                    <span className="sr-only">Close</span>
                  </CredenzaClose>
                </CredenzaHeader>
                <CredenzaBody>
                  <VenmoAuthForm className="pb-4" />
                </CredenzaBody>
              </CredenzaContent>
            </Credenza>
          )}
          <PendingTransactions />
          <Pools />
        </div>
      </div>
    </main>
  );
}
