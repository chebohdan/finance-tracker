import type { UserAccountResponse } from "../types/types";
import useAuth from "./useAuth";

const ACCOUNT_PERMISSIONS = {
  OWNER: {
    canCreateCategory: true,
    canDeleteTransaction: true,
    canInviteUsers: true,
  },
  USER: {
    canCreateCategory: false,
    canDeleteTransaction: false,
    canInviteUsers: false,
  },
};

function useAccountPermissions(userAccounts: UserAccountResponse[]) {
  const { userId } = useAuth();
  const userAccountRole =
    userAccounts.find((ua) => ua.userId == userId)?.role || "USER";
  return ACCOUNT_PERMISSIONS[userAccountRole];
}

export default useAccountPermissions;
