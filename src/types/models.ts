/* ---------===== custom models ====--------- */
export interface Transaction {
  accountId: number;
  profileId: number;
  transactionDate: Date;
  description: string;
  amount: number;
  category: string;
  subCategory: string;
  codingStatus: 'Pending' | 'Saved';
}

export interface Account {
  name: string;
  type: 'Credit Card' | 'Checking' | 'Savings' | 'Other';
  profileId: number;
}


/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  profileTransactions: Transaction[];
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
