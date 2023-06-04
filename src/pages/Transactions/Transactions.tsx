// css
import styles from './Transactions.module.css'

// types
import { Profile } from '../../types/models'

// components
import TopNav from '../../components/PageHeader/PageHeader';

interface TransactionsProps {
  profile: Profile | null;
}

const Transactions = (props: TransactionsProps) => {
  const { profile } = props

  if (!profile) return <h1>Loading...</h1>

  return (
    <main className={styles.container}>
      <TopNav pageName='Transactions'></TopNav>
    </main>
  )
}
 
export default Transactions