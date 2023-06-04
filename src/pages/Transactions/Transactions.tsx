// npm modules
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import currency from 'currency.js';

// css
import styles from './Transactions.module.css'

// types
import { Profile, Transaction } from '../../types/models'

// components
import TopNav from '../../components/PageHeader/PageHeader';

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
      <TopNav pageName='Transactions'></TopNav>
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
    </main>
  )
}
 
export default Transactions