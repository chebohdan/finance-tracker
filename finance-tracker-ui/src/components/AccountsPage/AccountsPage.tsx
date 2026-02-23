import { useEffect, useState } from "react";
import accountService from "../../api/accountService";
import type { AccountResponse } from "../../types/types";
import AccountCard from "./AccountCard";
import { CiSquarePlus } from "react-icons/ci";
import ModalWindow from "../ModalWindow/ModalWindow";
import CreateAccountForm from "./CreateAccountForm";
import useModalForm from "../ModalWindow/useModalForm";

function AccountsPage() {
  const { isOpen, setIsOpen } = useModalForm();
  const { getAccountsByUserId } = accountService();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const data = await getAccountsByUserId();
        console.log(data);
        setAccounts(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center">
        <div className="text-[var(--color-dark-text)]">Loading accounts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark-text)] flex items-center gap-3">
            My Accounts
          </h1>
          <p className="text-[var(--color-dark-text)] opacity-60 mt-2">
            Manage and view all your accounts
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}

          {/* Add new account card */}
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="
              flex justify-center items-center
              bg-[var(--color-dark-surface)]
              rounded-lg
              hover:shadow-lg
              hover:shadow-[var(--color-accent-shadow)]
              transition-all duration-300
              group
              hover:bg-[var(--color-dark-surface-hover)]
            "
          >
            <span className="text-[100px] text-[var(--color-dark-text)] group-hover:text-[var(--color-accent)] transition-colors">
              <CiSquarePlus size={100} />
            </span>
          </button>
        </div>
      </div>

      <ModalWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create account"
      >
        <CreateAccountForm />
      </ModalWindow>
    </div>
  );
}

export default AccountsPage;
