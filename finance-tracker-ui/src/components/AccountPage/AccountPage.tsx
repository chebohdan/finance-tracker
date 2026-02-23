// React
import { useState } from "react";

//RHF
import { useForm } from "react-hook-form";

//API
import accountService from "../../api/accountService";
import transactionService from "../../api/transactionService";
import {
  type TransactionRequest,
  type AccountInvitationRequest,
  type TransactionCategoryRequest,
} from "../../types/types";

// Router
import { useParams } from "react-router";

// Custom Component
import NewTransactionForm from "./NewTransactionForm";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import AccountUsers from "./AccountUsersTable/AccountUsersTable";
import Invitations from "./InvitationForm";
import accountInvitationsService from "../../api/accountInvitationsService";
import useAuth from "../../hooks/useAuth";
import Card from "../Card/Card";
import NewTransactionCategoryForm from "./NewTransactionCategoryForm";

// Icons
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGINATION_SIZE } from "../../constants/pagination";
import { QueryErrorFallback } from "../QueryErrorFallback";

// react-toastify
import useErrorToastNotification from "../../hooks/useToastNotification";
import useAccountPermissions from "../../hooks/useAccountPermissions";

function AccountPage() {
  //********************
  // State
  //********************

  const [page, setPage] = useState<number>(0);

  //********************
  // Navigation
  //********************
  const { id } = useParams() as { id: string };

  //********************
  // Auth
  //********************
  const { userId } = useAuth();

  //********************
  // Toastify hook
  //********************
  const { showError } = useErrorToastNotification();

  //********************
  // API services
  //********************
  const queryClient = useQueryClient();
  const { createAccountInvitation } = accountInvitationsService();
  const { getAccountById, updateAutoCategorization } = accountService();
  const {
    createTransaction,
    createTransactionCategory,
    getTransactionsByAccountId,
  } = transactionService();

  const {
    data: account,
    isLoading: isLoadingAccount,
    error: errorAccount,
    refetch: refetchAccount,
  } = useQuery({
    queryKey: ["getAccountById", id, page],
    queryFn: () => getAccountById(Number(id)),
    retry: false,
  });

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: errorTransaction,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["getTransactionsByAccountId", id, page],
    queryFn: () =>
      getTransactionsByAccountId(
        Number(id),
        page,
        PAGINATION_SIZE.TRANSACTIONS,
      ),
    enabled: !!account && !errorAccount,
  });

  const { mutate: mutateAutoCategorization } = useMutation({
    mutationFn: (newValue: boolean) =>
      updateAutoCategorization(Number.parseInt(id), newValue),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAccountById", id] });
    },

    onError: () => {
      showError("Failed to toggle auto categorization");
    },
  });
  const autoCategorizationEnabled =
    account?.userAccounts?.find((ua) => ua.userId === userId)
      ?.autoCategorization ?? false;

  const { mutate: createCategory } = useMutation({
    mutationFn: (category: TransactionCategoryRequest) =>
      createTransactionCategory(account?.id, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAccountById", id],
      });
    },

    onError: () => {
      showError("Failed to create category");
    },
  });

  const { mutate: mutateCreateAccountInvitation } = useMutation({
    mutationFn: createAccountInvitation,
    onSuccess: () =>
      resetInvite({
        inviteeUsername: "",
      }),
    onError: () => {
      showError("Failed to create an inviation.");
    },
  });

  const handleInvitationSubmit = (formData: { inviteeUsername: string }) => {
    mutateCreateAccountInvitation({
      ...formData,
      accountId: Number(id), // ✅ Add the missing field
    });
  };

  const { mutate: onTransactionSubmit } = useMutation({
    mutationFn: (transactionRequest: TransactionRequest) =>
      createTransaction(Number(id), transactionRequest),

    onSuccess: async () => {
      // Refetch transactions to show the new one
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getTransactionsByAccountId", id, page],
        }),
        queryClient.refetchQueries({
          queryKey: ["getAccountById", id],
        }),
      ]);

      // Reset form
      resetTransaction({
        name: "",
        amount: "",
        categoryId: "",
        description: "",
        transactionDate: new Date().toISOString().split("T")[0],
      });
    },

    onError: () => {
      showError("Failed to create transaction.");
    },
  });

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

  // New Category Form State
  const {
    register: registerNewCategory,
    handleSubmit: handleSubmitNewCategory,
    reset: resetNewCategory,
    formState: { errors: errorsNewCategory },
  } = useForm<TransactionCategoryRequest>();

  //********************
  // Prepare category options for select input
  //********************
  const categoryOptions =
    account?.transactionCategories?.map((cat) => ({
      label: cat.name,
      value: String(cat.id),
    })) ?? [];

  //********************
  // Permissions Check
  //********************
  const permissions = useAccountPermissions(account?.userAccounts ?? []);

  //********************
  // Handlers
  //********************

  // Create new category

  if (isLoadingAccount) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center">
        <p className="text-[var(--color-dark-text)]">Loading...</p>
      </div>
    );
  }

  const onTransactionsPageSelect = (newPage: number) => {
    setPage(newPage); // That's it! Query refetches automatically
  };

  //********************
  // Render
  //********************
  if (errorAccount && !account) {
    return (
      <QueryErrorFallback
        error={errorAccount}
        onRetry={refetchAccount}
        title="Failed to Load Account"
        isFatal={true}
      />
    );
  }

  if (errorTransaction && !transactions) {
    return (
      <QueryErrorFallback
        error={errorTransaction}
        onRetry={refetchTransactions}
        title="Failed to Load Transactions"
        isFatal={true}
      />
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <header className="pb-2 border-b border-dark-surface">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-dark-text mb-2">
            <MdOutlineAccountBalanceWallet className="text-accent" />
            <span>{account?.name}</span>
          </h1>
          <p className="text-sm text-dark-text/70">Manage your transactions</p>
        </header>

        {/* Main Content: Forms & Users Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-auto">
          {/* Left Column: Transaction Forms */}
          <section>
            <Card>
              {/* Transaction Form */}
              <div id="transaction-section-title" className="sr-only">
                Create New Transaction
              </div>
              <NewTransactionForm
                register={registerTransaction}
                onSubmit={onTransactionSubmit}
                handleSubmit={handleSubmitTransaction}
                categoryOptions={categoryOptions}
                errors={errorsTransaction}
                toggleAutoCat={() =>
                  mutateAutoCategorization(!autoCategorizationEnabled)
                }
                autoCategorizationEnabled={autoCategorizationEnabled}
              />

              {/* Transaction Category Form */}
              <hr className="my-8 border-dark-surface" />
              <div id="category-section-title" className="sr-only">
                Create New Transaction Category
              </div>
              <NewTransactionCategoryForm
                register={registerNewCategory}
                onSubmit={createCategory}
                handleSubmit={handleSubmitNewCategory}
                errors={errorsNewCategory}
              />
            </Card>
          </section>

          {/* Right Column: Account Users & Invitations */}
          <section className="space-y-4">
            <Card>
              {/* Account Users */}
              <article>
                <h2 id="users-title" className="sr-only">
                  Account Users
                </h2>
                <AccountUsers users={account?.userAccounts ?? []} />
              </article>

              {/* Invitation Form - Conditional Rendering */}
              {permissions.canInviteUsers && (
                <article className="mt-8 pt-8 border-t border-dark-surface">
                  <h2 id="invitations-title" className="sr-only">
                    Invite Users to Account
                  </h2>
                  <Invitations
                    register={registerInvite}
                    errors={errorsInvite}
                    onSubmit={handleInvitationSubmit}
                    handleSubmit={handleSubmitInvite}
                  />
                </article>
              )}
            </Card>
          </section>
        </section>

        {/* Transactions Table Section */}
        <section>
          <Card>
            {transactions && (
              <TransactionsTable
                transactions={transactions}
                onPageSelect={onTransactionsPageSelect}
              />
            )}
          </Card>
        </section>
      </div>
    </main>
  );
}

export default AccountPage;
