import { NavLink } from "react-router";
import type { AccountResponse } from "../../types/types";

type AccountCardProps = {
  account: AccountResponse;
};

function AccountCard({ account }: Readonly<AccountCardProps>) {
  return (
    <div className="bg-[var(--color-dark-surface)] rounded-lg p-6 hover:shadow-lg hover:shadow-[var(--color-accent)/20] transition-all duration-300 group hover:bg-[#3a3e44]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[var(--color-dark-text)] group-hover:text-[var(--color-accent)] transition-colors">
            {account.name}
          </h2>
        </div>
      </div>

      <div>
        <div>
          <p className="text-[var(--color-dark-text)] text-opacity-50 text-sm mb-1">
            Balance
          </p>
          <p className="text-2xl font-bold text-[var(--color-accent)]">
            {account.balance}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--color-dark-surface)]">
          <p className="text-[var(--color-dark-text)] text-opacity-50 text-sm">
            {account.transactions?.length || 0} transactions
          </p>
        </div>
      </div>

      <div>
        <NavLink
          to={`/accounts/${account.id}`}
          className="inline-block mt-4 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium transition-colors duration-200"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
}

export default AccountCard;
