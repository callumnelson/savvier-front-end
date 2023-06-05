// npm modules
import { useState } from 'react';
import currency from 'currency.js';

// css
import styles from './Transactions.module.css'

// types
import { Profile, Transaction } from '../../types/models'

// components
import PageHeader from '../../components/PageHeader/PageHeader';
import SubNav from '../../components/SubNav/SubNav';

interface TransactionsProps {
  profile: Profile | null;
}

interface TransactionDisplay {
  id: number;
  transactionDate: string;
  description: string;
  amount: string;
  category: string;
  subCategory: string;
}

const Transactions = (props: TransactionsProps) => {
  const { profile } = props
  const [selectedAccount, setSelectedAccount] = useState<number | undefined>(profile?.accounts[0].id)
  
  if (!profile) return <h1>Loading...</h1>
  
  const headers = [
    'Date',
    'Description',
    'Amount', 
    'Category',
    'Sub-Category'
  ]

  const rows = profile.profileTransactions.map( (t: Transaction): TransactionDisplay => {
    return {
      id: t.id,
      transactionDate: new Date(t.transactionDate).toLocaleDateString(),
      description: t.description,
      amount: currency(t.amount).format(),
      category: t.category,
      subCategory: t.subCategory,
    }
  })

  return (
    <main className={styles.container}>
      <PageHeader pageName='Transactions'></PageHeader>
      <section>
        <SubNav 
          accounts={profile.accounts}
          selectedAccount={selectedAccount}
        />
        <div className={styles.table}>
          <div className={styles.header}>
            {headers.map( (h) => (
              <div>
                <p>{h}</p>
              </div>
            ))}
          </div>
          <div className={styles.rows}>
            {rows.map(r => (
              <div key={r.id} className={styles.row}>
                <div><p>{r.transactionDate}</p></div>
                <div><p>{r.description}</p></div>
                <div><p>{r.amount}</p></div>
                <div><p>{r.category}</p></div>
                <div><p>{r.subCategory}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
 
export default Transactions