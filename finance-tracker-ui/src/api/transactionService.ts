import type {
  TransactionCategoryRequest,
  TransactionCategoryResponse,
  TransactionRequest,
  TransactionResponse,
} from "../types/types";
import { api } from "./api";

function transactionService() {
  const createTransaction = async (
    accountId: number,
    transactionRequest: TransactionRequest
  ): Promise<TransactionResponse> => {
    const { data } = await api.post<TransactionResponse>(
      `/accounts/${accountId}/transactions`,
      transactionRequest
    );
    return data;
  };

  const createTransactionCategory = async (
    accountId: number,
    transactionCategoryRequest: TransactionCategoryRequest
  ): Promise<TransactionCategoryResponse> => {
    const { data } = await api.post<TransactionCategoryResponse>(
      `/accounts/${accountId}/transaction-categories`,
      transactionCategoryRequest
    );
    return data;
  };

  return { createTransaction, createTransactionCategory };
}

export default transactionService;
