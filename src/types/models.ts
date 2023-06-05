/* ---------===== custom models ====--------- */
export interface Transaction {
  id: number;
  accountId: number;
  profileId: number;
  transactionDate: string;
  description: string;
  amount: number;
  category: 'Fun' | 'Food/Necessities' |	'Housing'	| 'Transportation' | 'Utilities' | 'Medical/Health' | 'Savings' | 'Insurance' | 'Personal' | 'Misc' | 'Income' | '-';
  subCategory: string;
  codingStatus: 'Pending' | 'Saved';
  createdAt: string;
  updatedAt: string;
}

export interface StateTransaction extends Transaction {
  formattedTransDate: Date;
}

export interface Account {
  id: number;
  name: string;
  type: 'Credit Card' | 'Checking' | 'Savings' | 'Other';
  profileId: number;
  createdAt: string;
  updatedAt: string;
}


/* ---------===== auth models =====--------- */

export interface Profile {
  id: number;
  name: string;
  photo?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  profileTransactions: StateTransaction[];
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
