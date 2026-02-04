import useSecureApi from "../hooks/useSecureApi";
import type {
  AccountRequest,
  AccountResponse,
  AutoCategorizationUpdateResponse,
} from "../types/types";

function accountService() {
  const api = useSecureApi();

  const getAccountsByUserId = async () => {
    const { data } = await api.get<AccountResponse[]>("/accounts");
    return data;
  };

  const getAccountById = async (id: number) => {
    const { data } = await api.get<AccountResponse>(`/accounts/${id}`);
    return data;
  };

  const createAccount = async (accountRequest: AccountRequest) => {
    const { data } = await api.post<AccountResponse>(
      "/accounts",
      accountRequest,
    );
    return data;
  };

  const updateAutoCategorization = async (
    accountId: number | undefined,
    autoCategorization: boolean,
  ) => {
    if (!accountId || accountId < 0) throw new Error("Invalid account ID");
    const { data } = await api.patch<AutoCategorizationUpdateResponse>(
      `/accounts/${accountId}/auto-categorization`,
      { autoCategorization },
    );
    return data;
  };

  return {
    getAccountsByUserId,
    getAccountById,
    createAccount,
    updateAutoCategorization,
  };
}

export default accountService;
