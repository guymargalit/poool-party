"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/data/transactions";

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useTransactions({
    status: undefined,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sent</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Sent To</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="w-[100px] text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: any) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>{transaction.payee.displayName}</TableCell>
            <TableCell>{transaction.payer.displayName}</TableCell>
            <TableCell>{transaction.status}</TableCell>
            <TableCell className="text-right">
              {(transaction.amount / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
