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
  profile: Profile;
}

const Transactions = (props: TransactionsProps) => {
  const { profile } = props
  const [
    selectedAccount, setSelectedAccount
  ] = useState<number>(profile.accounts[0].id)
  const [displayTransactions, setDisplayTransactions
  ] = useState<Transaction[]>(
    profile.profileTransactions.filter(t => t.accountId === profile.accounts[0].id)
  )

  console.log(profile.profileTransactions)

  const headers = [
    'Date',
    'Description',
    'Amount', 
    'Category',
    'Sub-Category'
  ]

  const handleAccountClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    console.log(profile.profileTransactions)
    console.log(evt.currentTarget.id)
    const newAccountId = parseInt(evt.currentTarget.id)
    setSelectedAccount(newAccountId)
    setDisplayTransactions(profile.profileTransactions.filter(t => t.accountId === newAccountId))
  }

  return (
    <main className={styles.container}>
      <PageHeader pageName='Transactions'></PageHeader>
      <section>
        <SubNav 
          accounts={profile.accounts}
          selectedAccount={selectedAccount}
          handleAccountClick={handleAccountClick}
        />
        <div className={styles.table}>
          <div className={styles.header}>
            {headers.map( (h) => (
              <div key={h}>
                <p>{h}</p>
              </div>
            ))}
          </div>
          <div className={styles.rows}>
            {displayTransactions.map(t => (
              <div key={t.id} className={styles.row}>
                <div><p>{new Date(t.transactionDate).toLocaleDateString()}</p></div>
                <div><p>{t.description}</p></div>
                <div><p>{currency(t.amount).format()}</p></div>
                <div><p>{t.category}</p></div>
                <div><p>{t.subCategory}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
 
export default Transactions