// services
import { StateTransaction } from '../types/models'
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/sub-categories`



export const deleteSubCategory = async (subCategoryId: number): Promise<StateTransaction[]> => {
  const res = await fetch(`${BASE_URL}/${subCategoryId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
    }
  })
  console.log(res)
  const updatedTransactions = await res.json() as StateTransaction[]
  updatedTransactions.forEach(u => {
    u.formattedTransDate = new Date(u.transactionDate)
  })
  return updatedTransactions
}