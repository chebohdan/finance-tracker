export type AccountResponse = {
  id: number;
  name: string;
  balance: number;
  transactions: TransactionResponse[];
  transactionCategories: TransactionCategoryResponse[];
  userAccounts: UserAccountResponse[];
  autoCategorization: boolean;
};

export type AccountInvitationResponse = {
  id: number;
  inviter: UserResponse;
  invitee: UserResponse;
  status: EAccountInvitationStatus;
  accountName: string;
  accountId: number;
  createdAt: string | null;
};

export type AccountInvitationRequest = {
  inviteeUsername: string;
  accountId: number;
};

export type AccountInvitationsResponse = {
  ACCEPTED: AccountInvitationResponse[];
  REJECTED: AccountInvitationResponse[];
  PENDING: AccountInvitationResponse[];
};

export type EAccountInvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type TransactionResponse = {
  id: number;
  name: string;
  description: string;
  amount: string;
  transactionDate: string;
  categoryName: string;
  user: UserResponse;
};

export type TransactionRequest = {
  name: string;
  description: string;
  amount: string;
  transactionDate: string;
  categoryId: string;
  accountId: string;
};

type TransactionCategoryResponse = {
  id: number;
  name: string;
};

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
};

export type UserAccountResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accountRole: boolean;
};

export type AccountRequest = {
  name: string;
  balance: number;
};

export type AutoCategorizationUpdateResponse = {
  autoCategorization: boolean;
};
