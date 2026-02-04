import type {
  PageInfo,
  TransactionCategoryRequest,
  TransactionCategoryResponse,
  TransactionRequest,
  TransactionResponse,
} from "../types/types";
import { api } from "./api";

function transactionService() {
  const createTransaction = async (
    accountId: number,
    transactionRequest: TransactionRequest,
  ): Promise<TransactionResponse> => {
    const { data } = await api.post<TransactionResponse>(
      `/accounts/${accountId}/transactions`,
      transactionRequest,
    );
    return data;
  };

  const createTransactionCategory = async (
    accountId: number | undefined,
    transactionCategoryRequest: TransactionCategoryRequest,
  ): Promise<TransactionCategoryResponse> => {
    if (!accountId || accountId <= 0) {
      throw new Error("Invalid account ID");
    }
    const { data } = await api.post<TransactionCategoryResponse>(
      `/accounts/${accountId}/transaction-categories`,
      transactionCategoryRequest,
    );
    return data;
  };

  const getTransactionsByAccountId = async (
    accountId: number,
    page: number,
    size: number,
  ): Promise<PageInfo<TransactionResponse>> => {
    const { data } = await api.get<PageInfo<TransactionResponse>>(
      `/accounts/${accountId}/transactions?page=${page}&size=${size}`,
    );

    const pageInfo: PageInfo<TransactionResponse> = {
      content: data.content,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    };

    return pageInfo;
  };

  return {
    createTransaction,
    createTransactionCategory,
    getTransactionsByAccountId,
  };
}

export default transactionService;
