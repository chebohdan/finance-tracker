import type { UserAccountResponse } from "../../types/types";

type AccountUsersProps = {
  users: UserAccountResponse[];
};

export default function AccountUsers({ users }: Readonly<AccountUsersProps>) {
  if (users.length === 0) {
    return (
      <div className="bg-[var(--color-dark-surface)] rounded-lg border border-[var(--color-dark-surface)]">
        <div className="px-4 py-6 text-center text-[var(--color-dark-text)]/50">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <form>
      {/* Users Table */}
      <h2 className="text-lg font-semibold text-[var(--color-dark-text)] mb-4">
        Account Users
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-dark-surface)]">
              <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-dark-text)]">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-dark-text)]">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-dark-text)]">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="border-b border-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface)]/50"
              >
                <td className="px-4 py-2 text-[var(--color-dark-text)]">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm mt-1">{user.email}</div>
                </td>
                <td className="px-4 py-2 text-[var(--color-dark-text)]">
                  {user.email}
                </td>
                <td className="px-4 py-2 text-[var(--color-dark-text)]">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
