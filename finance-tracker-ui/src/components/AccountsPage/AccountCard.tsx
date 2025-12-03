import { NavLink } from "react-router";
import type { AccountResponse } from "../../types/types";

type AccountCardProps = {
  account: AccountResponse;
};

function AccountCard({ account }: Readonly<AccountCardProps>) {
  return (
    <div className="bg-[#31353b] rounded-lg p-6 hover:shadow-lg hover:shadow-[#6c63ff]/20 transition-all duration-300  group hover:bg-[#3a3e44]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#e0e0e0] group-hover:text-[#6c63ff] transition-colors">
            {account.name}
          </h2>
        </div>
      </div>

      <div className="">
        <div>
          <p className="text-[#e0e0e0] text-opacity-50 text-sm mb-1">Balance</p>
          <p className="text-2xl font-bold text-[#6c63ff]">{account.balance}</p>
        </div>

        <div className="pt-3 border-t border-[#31353b]">
          <p className="text-[#e0e0e0] text-opacity-50 text-sm">
            {account.transactions?.length || 0} transactions
          </p>
        </div>
      </div>

      <div>
        <NavLink
          to={`/accounts/${account.id}`}
          className="inline-block mt-4 px-4 py-2 bg-[#6c63ff] hover:bg-[#5750d4] text-white rounded-lg font-medium transition-colors duration-200"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
}

export default AccountCard;
