// services
import * as tokenService from './tokenService'

// types 
import { SubCatForm } from "../types/forms"
import { Account, Category, SubCategory } from "../types/models"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/categories`

export const createSubCategory = async (categoryId: number, subCategoryForm: SubCatForm): Promise<SubCategory> => {
  const res = await fetch(`${BASE_URL}/${categoryId}`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subCategoryForm),
  })
  return await res.json() as SubCategory
}

// export const createCategory = async (formData: CategoryFormData): Promise<Category> => {
//   const res = await fetch(`${BASE_URL}/`, {
//     method: 'POST',
//     headers: { 
//       'Authorization': `Bearer ${tokenService.getToken()}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData),
//   })
//   return await res.json() as Category
// }

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await fetch(`${BASE_URL}/${categoryId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
    }
  })
}