"use client";

import { TransactionCard } from "@/components/transaction-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/data/transactions";
import { Status } from "@prisma/client";

type PendingTransaction = {
  id: string;
  status: string;
  amount: number;
  pid: string | null;
  payer: { image: string | null; displayName: string };
  pool: { note: string } | null;
};

export default function PendingTransactions() {
  const { data: transactions, isLoading } = useTransactions({
    status: Status.PENDING,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Accordion defaultValue="" type="single" collapsible>
      <AccordionItem className="border-none" value="pending">
        <AccordionTrigger className="pb-1 pl-1">
          <div className="flex flex-row items-center justify-between">
            <span className="font-medium">Pending</span>
            <Badge className="ml-2">{transactions.length}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-1 flex flex-col gap-2">
          {transactions.map((transaction: PendingTransaction) => (
            <TransactionCard
              key={transaction.id}
              name={transaction.payer.displayName}
              image={transaction.payer.image}
              amount={transaction.amount}
              note={transaction.pool?.note || ""}
              status={transaction.status as Status}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
