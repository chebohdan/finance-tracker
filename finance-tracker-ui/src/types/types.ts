export type AccountRequest = {
  name: string;
  balance: number;
};

export type AccountResponse = {
  id: number;
  name: string;
  balance: number;
  transactions: TransactionResponse[];
  transactionCategories: TransactionCategoryResponse[];
  userAccounts: UserAccountResponse[];
};

export type UserAccountResponse = {
  userId: number;
  accountId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "OWNER" | "USER";
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
  categoryId: string;
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

export type TransactionCategoryRequest = {
  name: string;
};

export type TransactionCategoryResponse = {
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

export type AutoCategorizationUpdateResponse = {
  autoCategorization: boolean;
};

export type InvitationDecisionStatus = "ACCEPTED" | "REJECTED";

export interface InvitationDecisionRequest {
  status: InvitationDecisionStatus;
}
