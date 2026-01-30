import type { PageInfo, TransactionResponse } from "../../../types/types";
import Pagination from "../Pagination/Pagination";
import TransactionRow from "./TransactionRow";

type TransactionsTableProps = {
  transactions: PageInfo<TransactionResponse>;
  onPageSelect: (page: number) => void;
};

export default function TransactionsTable({
  transactions,
  onPageSelect,
}: Readonly<TransactionsTableProps>) {
  if (transactions.content?.length === 0) {
    return (
      <div className="bg-[var(--color-dark-bg)]  rounded-lg border ">
        <div className="px-4 py-6 text-center text-[var(--color-dark-text)]/50">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-dark-bg)] rounded-lg overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-sm text-left semi-bold ">
            <tr className="bbg-[var(--color-dark-bg)] font-semibold text-[var(--color-dark-text)]">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.content?.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </tbody>
        </table>
        <Pagination pageInfo={transactions} onPageSelect={onPageSelect} />
      </div>
    </div>
  );
}
