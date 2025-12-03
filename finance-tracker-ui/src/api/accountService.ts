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
      accountRequest
    );
    return data;
  };

  const updateAutoCategorization = async (
    id: number,
    autoCategorization: boolean
  ) => {
    const { data } = await api.patch<AutoCategorizationUpdateResponse>(
      `/accounts/${id}/auto-categorization`,
      { autoCategorization }
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
