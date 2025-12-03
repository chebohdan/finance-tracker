import { useEffect, useState } from "react";
import accountInvitationsService from "../../api/accountInvitationsService";
import type { AccountInvitationsResponse } from "../../types/types";

type Tab = "incoming" | "outgoing";

function AccountInvitationsPage() {
  const [incomingInvitation, setIncomingInvitation] =
    useState<AccountInvitationsResponse>();
  const [outgoingInvitation, setOutgoingInvitation] =
    useState<AccountInvitationsResponse>();
  const [activeTab, setActiveTab] = useState<Tab>("incoming");

  const { getInvitationsByType } = accountInvitationsService();

  useEffect(() => {
    getInvitationsByType("incoming").then(setIncomingInvitation);
    getInvitationsByType("outgoing").then(setOutgoingInvitation);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "border-[var(--color-warning)] bg-[var(--color-warning)]/20";
      case "ACCEPTED":
        return "border-[var(--color-success)] bg-[var(--color-success)]/20";
      case "REJECTED":
        return "border-[var(--color-danger)] bg-[var(--color-danger)]/20";
      default:
        return "border-[var(--color-dark-text)] bg-[var(--color-dark-surface)]/20";
    }
  };

  const renderInvitations = (invitations?: AccountInvitationsResponse) => {
    if (!invitations) return <p className="p-4">Loading...</p>;

    const allInvites = [
      ...(invitations.ACCEPTED ?? []),
      ...(invitations.PENDING ?? []),
      ...(invitations.REJECTED ?? []),
    ];

    if (allInvites.length === 0)
      return <p className="p-4">No invitations found.</p>;

    return (
      <div className="grid gap-4 p-4">
        {allInvites.map((invite) => (
          <div
            key={invite.id}
            className={`p-4 rounded-lg border flex justify-between items-center ${getStatusColor(
              invite.status
            )}`}
          >
            <div className="space-y-1">
              <p className="text-[var(--color-dark-text)]">
                <span className="font-semibold">Account:</span>{" "}
                {invite.accountName}
              </p>
              <p className="text-[var(--color-dark-text)] text-sm">
                <span className="font-semibold">Invitee:</span>{" "}
                {invite.invitee.firstName} {invite.invitee.lastName} (
                {invite.invitee.email})
              </p>
              <p className="text-[var(--color-dark-text)] text-sm">
                <span className="font-semibold">Inviter:</span>{" "}
                {invite.inviter.firstName} {invite.inviter.lastName} (
                {invite.inviter.email})
              </p>
              <p className="text-[var(--color-dark-text)] text-sm">
                {invite.createdAt}
              </p>
              <p className="text-[var(--color-dark-text)] text-sm">
                <span className="font-semibold">Role:</span> {invite.role}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                invite.status
              )}`}
            >
              {invite.status}
            </span>{" "}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]">
      <ul className="flex border-b border-[var(--color-dark-surface)] mb-4">
        {(["incoming", "outgoing"] as Tab[]).map((tab) => (
          <li key={tab} className="mr-2">
            <button
              onClick={() => setActiveTab(tab)}
              className={`inline-block p-3 rounded-t-lg focus:outline-none ${
                activeTab === tab
                  ? "bg-[var(--color-dark-surface)]"
                  : "bg-[var(--color-dark-bg)] hover:bg-[var(--color-dark-surface)]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "incoming"
        ? renderInvitations(incomingInvitation)
        : renderInvitations(outgoingInvitation)}
    </div>
  );
}

export default AccountInvitationsPage;
