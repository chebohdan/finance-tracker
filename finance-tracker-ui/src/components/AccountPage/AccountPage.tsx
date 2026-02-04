// React
import { useState } from "react";

//RHF
import { useForm } from "react-hook-form";
import type { FormSelectInputOption } from "../Inputs/FormSelectInput";

//API
import accountService from "../../api/accountService";
import transactionService from "../../api/transactionService";
import {
  type AccountResponse,
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

function AccountPage() {
  //********************
  // State
  //********************

  const [page, setPage] = useState(0);

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
  const queryClient = useQueryClient();
  const { createAccountInvitation } = accountInvitationsService();
  const { getAccountById, updateAutoCategorization } = accountService();
  const {
    createTransaction,
    createTransactionCategory,
    getTransactionsByAccountId,
  } = transactionService();

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: errorTransaction,
  } = useQuery({
    queryKey: ["getTransactionsByAccountId", id, page],
    queryFn: () => getTransactionsByAccountId(Number(id), page, 3),
  });

  const {
    data: account,
    isLoading: isLoadingAccount,
    error: errorAccount,
  } = useQuery({
    queryKey: ["getAccountById", id, page],
    queryFn: () => getAccountById(Number(id)),
  });

  const { mutate: mutateAutoCategorization } = useMutation({
    mutationFn: (newValue: boolean) =>
      updateAutoCategorization(account!.id, newValue),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAccountById", id] });
    },

    onError: (err) => {
      console.error("Failed to update auto-categorization:", err);
    },
  });

  const autoCategorizationEnabled =
    account?.userAccounts?.find((ua) => ua.userId === userId)
      ?.autoCategorization ?? false;

  const { mutate: mutateCreateAccountInvitation } = useMutation({
    mutationFn: createAccountInvitation,
    onSuccess: () =>
      resetInvite({
        inviteeUsername: "",
      }),
    onError: (err) => {
      console.error("Failed to update auto-categorization:", err);
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

    onSuccess: () => {
      // Refetch transactions to show the new one
      queryClient.invalidateQueries({
        queryKey: ["getTransactionsByAccountId", id, page],
      });

      queryClient.invalidateQueries({
        queryKey: ["getAccountById", id],
      });

      // Reset form
      resetTransaction({
        name: "",
        amount: "",
        categoryId: "",
        description: "",
        transactionDate: new Date().toISOString().split("T")[0],
      });
    },

    onError: (error) => {
      console.error("Failed to create transaction:", error);
    },
  });

  const { mutate: createCategory } = useMutation({
    mutationFn: (category: TransactionCategoryRequest) =>
      createTransactionCategory(account!.id, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAccountById", id],
      });
    },

    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? "Failed to create category";
      alert(msg);
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

  const isOwner = account?.userAccounts?.some(
    (ua) => ua.role === "OWNER" && ua.userId === userId,
  );

  const onTransactionsPageSelect = (newPage: number) => {
    setPage(newPage); // That's it! Query refetches automatically
  };

  //********************
  // Render
  //********************
  return (
    <div className="min-h-screen  p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Account Name */}
        <div className="text-[var(--color-dark-text)]">
          <h1 className=" flex items-center gap-2 text-3xl font-bold  mb-4">
            <MdOutlineAccountBalanceWallet />
            <span>{account?.name}</span>
          </h1>
          <p className="text-md text-muted">Manage your transaction</p>
        </div>

        {/* Top Section: Form & Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-auto">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <Card>
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
              <NewTransactionCategoryForm
                register={registerNewCategory}
                onSubmit={createCategory}
                handleSubmit={handleSubmitNewCategory}
                errors={errorsNewCategory}
              />
            </Card>
          </div>

          {/* Users Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <AccountUsers users={account?.userAccounts ?? []} />
              {isOwner && (
                <div className="mt-3">
                  <Invitations
                    register={registerInvite}
                    errors={errorsInvite}
                    onSubmit={handleInvitationSubmit}
                    handleSubmit={handleSubmitInvite}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Transactions Table */}
        <Card>
          {transactions && (
            <TransactionsTable
              transactions={transactions}
              onPageSelect={onTransactionsPageSelect}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default AccountPage;
