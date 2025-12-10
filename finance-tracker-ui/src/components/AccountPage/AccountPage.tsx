// React
import { useEffect, useState } from "react";

//RHF
import { useForm } from "react-hook-form";
import type { FormSelectInputOption } from "../Inputs/FormSelectInput";

//API
import accountService from "../../api/accountService";
import transactionService from "../../api/transactionService";
import {
  type TransactionResponse,
  type AccountResponse,
  type TransactionRequest,
  type AccountInvitationRequest,
} from "../../types/types";

// Router
import { useParams } from "react-router";

// Custom Component
import NewTransactionForm from "./NewTransactionForm";
import TransactionsTable from "./TransactionsTable";
import AccountUsers from "./AccountUsers";
import Invitations from "./InvitationForm";
import accountInvitationsService from "../../api/accountInvitationsService";
import useAuth from "../../hooks/useAuth";

function AccountPage() {
  //********************
  // State
  //********************
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [autoCategorizationEnabled, setAutoCategorizationEnabled] =
    useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<
    FormSelectInputOption[]
  >([]);

  //********************
  // Navigation
  //********************
  const { id } = useParams() as { id: string };

  //********************
  // Auth
  //********************
  const { userId } = useAuth();

  //********************
  // API services
  //********************
  const { createAccountInvitation } = accountInvitationsService();
  const { getAccountById, updateAutoCategorization } = accountService();
  const { createTransaction } = transactionService();

  //********************
  // React Hook Form setup
  //********************

  // Transaction Form State
  const {
    register: registerTransaction,
    handleSubmit: handleSubmitTransaction,
    reset: resetTransaction,
    formState: { errors: errorsTransaction },
  } = useForm<TransactionRequest>({
    defaultValues: {
      transactionDate: new Date().toISOString().split("T")[0],
    },
  });

  // Account Invitation Form State
  const {
    register: registerInvite,
    handleSubmit: handleSubmitInvite,
    reset: resetInvite,
    formState: { errors: errorsInvite },
  } = useForm<AccountInvitationRequest>({});

  //********************
  // Prepare category options for select input
  //********************
  useEffect(() => {
    if (account?.transactionCategories) {
      setCategoryOptions(
        account.transactionCategories.map((cat) => ({
          label: cat.name,
          value: String(cat.id),
        }))
      );
    }
  }, [account?.transactionCategories]);

  //********************
  // Fetch account on mount
  //********************
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const data = await getAccountById(Number(id));
        setAccount(data);
        setTransactions(data.transactions ?? []);

        const currentUserAccount = data.userAccounts?.find(
          (ua) => ua.userId === userId
        );
        setAutoCategorizationEnabled(
          currentUserAccount?.autoCategorization ?? false
        );
      } catch (err) {
        console.error("Failed to load account:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id, userId]);

  //********************
  // Toggle auto-categorization
  //********************
  const toggleAutoCat = async () => {
    if (!account) return;
    const newValue = !autoCategorizationEnabled;
    setAutoCategorizationEnabled(newValue);

    try {
      const data = await updateAutoCategorization(account.id, newValue);
      setAutoCategorizationEnabled(data.autoCategorization);
    } catch (err) {
      console.error("Failed to update auto-categorization:", err);
      setAutoCategorizationEnabled(!newValue);
    }
  };

  //********************
  // Handlers
  //********************
  const onTransactionSubmit = async (
    transactionRequest: TransactionRequest
  ) => {
    try {
      const transaction = await createTransaction(
        Number(id),
        transactionRequest
      );

      // Update transactions state
      setTransactions((prev) => [transaction, ...prev]);

      // If the transaction has a new category, update categoryOptions
      if (transaction.categoryName) {
        const categoryExists = categoryOptions.some(
          (cat) => cat.value === transaction.categoryId
        );
        if (!categoryExists) {
          setCategoryOptions((prev) => [
            ...prev,
            {
              label: transaction.categoryName,
              value: String(transaction.categoryId),
            },
          ]);
        }
      }

      // Reset form
      resetTransaction({
        name: "",
        amount: "",
        categoryId: "",
        description: "",
        transactionDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  const onInvitationSubmit = (
    accountInvitationRequest: AccountInvitationRequest
  ) => {
    accountInvitationRequest.accountId = Number.parseInt(id);
    createAccountInvitation(accountInvitationRequest)
      .then((response) => {
        console.log(response);
        resetInvite({
          inviteeUsername: "",
        });
      })
      .catch((error) => console.error("Failed to create transaction:", error));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center">
        <p className="text-[var(--color-dark-text)]">Loading...</p>
      </div>
    );
  }

  const isOwner = account?.userAccounts?.some(
    (ua) => ua.role === "OWNER" && ua.userId === userId
  );

  console.log(account?.userAccounts);
  //********************
  // Render
  //********************
  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Account Name */}
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)] mb-4">
          {account?.name}
        </h1>

        {/* Top Section: Form & Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-auto">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <NewTransactionForm
              register={registerTransaction}
              onSubmit={onTransactionSubmit}
              handleSubmit={handleSubmitTransaction}
              categoryOptions={categoryOptions}
              errors={errorsTransaction}
              toggleAutoCat={toggleAutoCat}
              autoCategorizationEnabled={autoCategorizationEnabled}
            />
          </div>

          {/* Users Section */}
          <div className="lg:col-span-1 space-y-6">
            <AccountUsers users={account?.userAccounts ?? []} />
            {isOwner && (
              <Invitations
                register={registerInvite}
                errors={errorsInvite}
                onSubmit={onInvitationSubmit}
                handleSubmit={handleSubmitInvite}
              />
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-dark-text)] mb-4">
            Transactions
          </h2>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
