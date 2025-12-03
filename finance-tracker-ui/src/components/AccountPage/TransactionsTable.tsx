import type { TransactionResponse } from "../../types/types";
import TransactionRow from "./TransactionRow";

type TransactionsTableProps = {
  transactions: TransactionResponse[];
};

export default function TransactionsTable({
  transactions,
}: Readonly<TransactionsTableProps>) {
  if (transactions.length === 0) {
    return (
      <div className="bg-[var(--color-dark-surface)] rounded-lg border border-[var(--color-dark-surface)]">
        <div className="px-4 py-6 text-center text-[var(--color-dark-text)]/50">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-dark-bg)] rounded-lg overflow-hidden border-2 border-[var(--color-dark-surface)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-sm text-left semi-bold ">
            <tr className="border-b-2 border-[var(--color-dark-surface)] bg-[var(--color-dark-bg)] font-semibold text-[var(--color-dark-text)]">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
