/* ---------==== custom forms ====--------- */

export interface UploadTransaction {
  amount: string;
  description: string;
  transactionDate: string;
  category?: string;
  subCategory?: string;
}

export interface TransactionsFormData {
  transactions: UploadTransaction[]
}

// export interface Category {
//   value: string;
//   schemaName: string;
// }[]

// export interface SubCategory {
//   [key: string]: string[];
// }

export interface AccountFormData {
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card' | 'Other'
}

export interface SubCatForm {
  name: string;
}

export interface CatForm {
  name: string;
}


/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
