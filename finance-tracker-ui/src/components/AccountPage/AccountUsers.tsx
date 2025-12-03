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
    <div className=" rounded-lg p-6 border-2 border-[var(--color-dark-surface)] space-y-6">
      {/* Users Table */}
      <div>
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
                  key={user.id}
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
                    {user.accountRole}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite User Form */}
      <div className="border-t border-[var(--color-dark-surface)] pt-4">
        <h3 className="text-md font-medium text-[var(--color-dark-text)] mb-2">
          Invite User
        </h3>
        {/*
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={handleSubmit(onInvite)}
        >
          <input
            className="flex-1 p-2 rounded-lg bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]"
            type="email"
            placeholder="User email"
            {...register("email", { required: true })}
          />
          <select
            className="p-2 rounded-lg bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]"
            {...register("role", { required: true })}
          >
            <option value="">Select role</option>
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Invite
          </button>
        </form>*/}
      </div>
    </div>
  );
}
