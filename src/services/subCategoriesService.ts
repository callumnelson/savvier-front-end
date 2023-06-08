// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/sub-categories`



export const deleteSubCategory = async (subCategoryId: number): Promise<void> => {
  await fetch(`${BASE_URL}/${subCategoryId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
    }
  })
}