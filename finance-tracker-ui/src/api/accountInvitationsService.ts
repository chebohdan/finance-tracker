import useSecureApi from "../hooks/useSecureApi";
import type {
  AccountInvitationRequest,
  AccountInvitationResponse,
  AccountInvitationsResponse,
  InvitationDecisionRequest,
  InvitationDecisionStatus,
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
    accountInvitationRequest: AccountInvitationRequest,
  ) => {
    const { data } = await api.post<AccountInvitationsResponse>(
      "/invitations",
      accountInvitationRequest,
    );
    return data;
  };

  const respondToInvitation = async (
    invitationId: number,
    decision: InvitationDecisionStatus,
  ) => {
    const payload: InvitationDecisionRequest = {
      status: decision,
    };

    const { data } = await api.patch<AccountInvitationResponse>(
      `/invitations/${invitationId}`,
      payload,
    );

    return data;
  };

  return {
    getInvitationsByType,
    createAccountInvitation,
    respondToInvitation,
  };
}

export default accountInvitationsService;
