/* ---------==== custom forms ====--------- */

export interface UploadTransaction {
  amount: string;
  description: string;
  transactionDate: string;
}

export interface TransactionsFormData {
  transactions: UploadTransaction[]
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
