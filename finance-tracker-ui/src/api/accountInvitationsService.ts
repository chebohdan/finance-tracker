import useSecureApi from "../hooks/useSecureApi";
import type {
  AccountInvitationRequest,
  AccountInvitationsResponse,
} from "../types/types";

function accountInvitationsService() {
  const api = useSecureApi();

  const getInvitationsByType = async (type: string) => {
    const { data } = await api.get<AccountInvitationsResponse>(`/invitations`, {
      params: { type },
    });
    console.log(data);
    return data;
  };

  const createAccountInvitation = async (
    accountInvitationRequest: AccountInvitationRequest
  ) => {
    const { data } = await api.post<AccountInvitationsResponse>(
      "/invitations",
      accountInvitationRequest
    );
    return data;
  };

  return {
    getInvitationsByType,
    createAccountInvitation,
  };
}

export default accountInvitationsService;
