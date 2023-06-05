// services
import * as tokenService from './tokenService'

// types 
import { StateTransaction } from "../types/models"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/transactions`

export const updateTransaction = async (transaction: StateTransaction): Promise<StateTransaction> => {
  const res = await fetch(`${BASE_URL}/${transaction.id}`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction),
  })
  const updatedTransaction = await res.json() as StateTransaction
  updatedTransaction.formattedTransDate = new Date(updatedTransaction.transactionDate)
  return updatedTransaction
}