// services
import * as tokenService from './tokenService'

// types 
import { TransactionsFormData } from "../types/forms"
import { StateTransaction } from "../types/models"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/accounts`

export const createTransactions = async (formData: TransactionsFormData, accountId: number): Promise<StateTransaction[]> => {
  const res = await fetch(`${BASE_URL}/${accountId}/create-transactions`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  try {
    const transactions = await res.json() as StateTransaction[]
    transactions.forEach(t => 
      t.formattedTransDate = new Date(t.transactionDate)
    )
    return transactions
  } catch (err) {
    console.log(err)
    return await res.json()
  }
}