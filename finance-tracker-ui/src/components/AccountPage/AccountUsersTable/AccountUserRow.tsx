import type { UserAccountResponse } from "../../../types/types";

type UserRowProps = {
  user: UserAccountResponse;
};

export default function AccountUserRow({ user }: Readonly<UserRowProps>) {
  return (
    <tr className="bg-[var(--color-dark-bg)] hover:bg-[var(--color-dark-surface)]/50 transition-colors duration-300">
      <td className="px-4 py-2">
        <div className="font-medium text-[var(--color-dark-text)]">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-sm text-[var(--color-dark-text)]/50 mt-1">
          {user.email}
        </div>
      </td>
      <td className="px-4 py-2 text-[var(--color-dark-text)]">{user.email}</td>
      <td className="px-4 py-2 text-[var(--color-dark-text)]">{user.role}</td>
    </tr>
  );
}
