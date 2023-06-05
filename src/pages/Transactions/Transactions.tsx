// npm modules
import { ChangeEvent, useState } from 'react';
import currency from 'currency.js';

// css
import styles from './Transactions.module.css'

// types
import { Profile, StateTransaction } from '../../types/models'

// components
import PageHeader from '../../components/PageHeader/PageHeader';
import SubNav from '../../components/SubNav/SubNav';

interface TransactionsProps {
  profile: Profile;
}

interface SortObject {
  schemaName: string;
  order: number;
}

interface FilterObject {
  category: string;
  subCategory: string;
}

const Transactions = (props: TransactionsProps) => {
  const { profile } = props
  const [
    selectedAccount, setSelectedAccount
  ] = useState<number>(profile.accounts[1].id)
  const [displayTransactions, setDisplayTransactions
  ] = useState<StateTransaction[]>(
    profile.profileTransactions.filter(
      t => t.accountId === profile.accounts[1].id
    ).sort( (a, b) => b.formattedTransDate.getTime() - a.formattedTransDate.getTime())
  )
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortObject>({schemaName: 'formattedTransDate', order: 1})
  const [filter, setFilter] = useState<FilterObject>({category: "", subCategory: ""})
  
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

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const newSearch = evt.currentTarget.value
    setSearch(newSearch)
    setDisplayTransactions(profile.profileTransactions.filter(t => t.description.toLocaleLowerCase().includes(newSearch.toLowerCase())))
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
        <div className={styles.tableContainer}>
        <nav>
          <div>
            <button
            >
              Add Transactions
            </button>
            <button
            >
              Show All
            </button>
            <input
              className={styles.search}
              type="text"
              value={search}
              name="search"
              placeholder="Search..."
              onChange={handleSearchChange}
              />
          </div>
        </nav>
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
                  <div><p>{t.formattedTransDate?.toLocaleDateString()}</p></div>
                  <div><p>{t.description}</p></div>
                  <div><p>{currency(t.amount).format()}</p></div>
                  <div><p>{t.category}</p></div>
                  <div><p>{t.subCategory}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
 
export default Transactions