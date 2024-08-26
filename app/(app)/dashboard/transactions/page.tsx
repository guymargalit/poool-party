import TransactionsTable from "./transactions-table";

export default async function Transactions() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex-1 bg-background/80 flex flex-col items-center pt-0">
        <div className="w-full max-w-4xl p-0">
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
}
