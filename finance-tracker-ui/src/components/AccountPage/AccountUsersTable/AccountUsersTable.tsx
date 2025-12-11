import { LuUsersRound } from "react-icons/lu";

import type { UserAccountResponse } from "../../../types/types";
import AccountUserRow from "./AccountUserRow";

type AccountUsersProps = {
  users: UserAccountResponse[];
};

export default function AccountUsers({ users }: Readonly<AccountUsersProps>) {
  if (users.length === 0) {
    return (
      <div className="bg-[var(--color-dark-surface)] rounded-lg border border-[var(--color-dark-surface)]">
        <div className="px-4 py-6 text-center text-[var(--color-dark-text)]/50">
          No users yet
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Users Table */}
      <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-dark-text)]">
        <LuUsersRound />
        <span>Users</span>
      </h2>
      <div className="overflow-x-auto mt-3 rounded-lg bg-[var(--color-dark-bg)]">
        <table className="w-full text-[var(--color-dark-text)]">
          <thead>
            <tr className="bg-[var(--color-dark-bg)]">
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <AccountUserRow key={user.userId} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
