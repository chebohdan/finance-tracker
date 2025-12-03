import type { TransactionResponse } from "../../types/types";

type TransactionRowProps = {
  transaction: TransactionResponse;
};

export default function TransactionRow({
  transaction,
}: Readonly<TransactionRowProps>) {
  const amount = Number.parseFloat(transaction.amount);
  return (
    <tr className="border-b-2 border-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface)]/50 text-[var(--color-dark-text)]">
      <td className="px-4 py-3 ">
        <div>
          {transaction.user.firstName} {transaction.user.lastName}
        </div>
        <div className="text-sm mt-1">{transaction.user.email}</div>
      </td>
      <td className="px-4 py-3 ">{transaction.name}</td>
      <td
        className={`px-4 py-3 ${
          amount > 0 ? "text-green-400" : "text-red-400"
        } font-medium`}
      >
        ${amount.toFixed(2)}
      </td>
      <td className="px-4 py-3  text-sm">{transaction.categoryName}</td>
      <td className="px-4 py-3  text-sm">
        {new Date(transaction.transactionDate).toLocaleDateString()}
      </td>
    </tr>
  );
}
