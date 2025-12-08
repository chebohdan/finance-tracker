import type { TransactionRequest, TransactionResponse } from "../types/types";
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
  return { createTransaction };
}

export default transactionService;
