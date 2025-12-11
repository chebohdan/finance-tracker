import { useEffect, useState } from "react";
import accountInvitationsService from "../../api/accountInvitationsService";
import type { AccountInvitationsResponse } from "../../types/types";
import Card from "../Card/Card";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";

type Tab = "incoming" | "outgoing";
type SubTab = "PENDING" | "ACCEPTED" | "REJECTED";

function AccountInvitationsPage() {
  const [incomingInvitation, setIncomingInvitation] =
    useState<AccountInvitationsResponse>();
  const [outgoingInvitation, setOutgoingInvitation] =
    useState<AccountInvitationsResponse>();
  const [activeTab, setActiveTab] = useState<Tab>("incoming");

  // NEW: sub tab
  const [subTab, setSubTab] = useState<SubTab>("PENDING");

  const { userId } = useAuth();
  const { getInvitationsByType } = accountInvitationsService();

  useEffect(() => {
    getInvitationsByType("incoming").then(setIncomingInvitation);
    getInvitationsByType("outgoing").then(setOutgoingInvitation);
  }, []);

  const getStatusShadow = (status: string) => {
    switch (status) {
      case "PENDING":
        return "shadow-[2px_2px_6px_var(--color-warning)]";
      case "ACCEPTED":
        return "shadow-[2px_2px_6px_var(--color-success)]";
      case "REJECTED":
        return "shadow-[2px_2px_6px_var(--color-danger)]";
      default:
        return "shadow-[2px_2px_6px_var(--color-dark-text)]";
    }
  };

  const handleResponse = (inviteId: number, type: string) => {};

  // Renders cards inside a tab + sub tab
  const renderInvitations = (invitations?: AccountInvitationsResponse) => {
    if (!invitations) return <p className="p-4">Loading...</p>;

    // Filter by sub-tab
    const filteredInvites = invitations[subTab] ?? [];

    if (filteredInvites.length === 0)
      return <p className="p-4">No invitations found.</p>;

    return (
      <div className="grid gap-4 p-4">
        {filteredInvites.map((invite) => (
          <Card
            key={invite.id}
            className={`p-4 rounded-lg flex justify-between items-center ${getStatusShadow(
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
            </div>

            {invite.status === "PENDING" && invite.invitee.id === userId && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => handleResponse(invite.id, "ACCEPTED")}
                  className="py-1 px-3 text-sm"
                  variant="primary"
                >
                  Accept
                </Button>

                <Button
                  type="button"
                  onClick={() => handleResponse(invite.id, "REJECTED")}
                  className="py-1 px-3 text-sm"
                  variant="danger"
                >
                  Reject
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]">
      {/* MAIN TABS */}
      <ul className="flex border-b border-[var(--color-dark-surface)] mb-4">
        {(["incoming", "outgoing"] as Tab[]).map((tab) => (
          <li key={tab} className="mr-2">
            <button
              onClick={() => {
                setActiveTab(tab);
                setSubTab("PENDING"); // reset sub tab when switching main tabs
              }}
              className={`inline-block p-3 rounded-t-lg ${
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

      {/* SUB TABS */}
      <ul className="flex gap-2 mb-4">
        {(["PENDING", "ACCEPTED", "REJECTED"] as SubTab[]).map((s) => (
          <button
            key={s}
            onClick={() => setSubTab(s)}
            className={`px-3 py-1 rounded-lg text-sm border transition-colors 
              ${
                subTab === s
                  ? "bg-[var(--color-dark-surface)] border-[var(--color-accent)]"
                  : "bg-[var(--color-dark-bg)] border-[var(--color-dark-surface)] hover:bg-[var(--color-dark-surface)]"
              }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </ul>

      {/* CONTENT */}
      {activeTab === "incoming"
        ? renderInvitations(incomingInvitation)
        : renderInvitations(outgoingInvitation)}
    </div>
  );
}

export default AccountInvitationsPage;
