// npm modules
import { ChangeEvent, useState } from 'react';

// css
import styles from './Transactions.module.css'

// data
import { categories } from '../../data/categories'

// types
import { Profile, StateTransaction } from '../../types/models'

// service
import * as accountsService from '../../services/accountsService'
import * as transactionsService from '../../services/transactionsService'

// components
import PageHeader from '../../components/PageHeader/PageHeader';
import SubNav from '../../components/SubNav/SubNav';
import UploadTransModal from '../../components/UploadTransModal/UploadTransModal'
import { TransactionsFormData } from '../../types/forms';
import TransactionCard from '../../components/TransactionCard/TransactionCard';

interface TransactionsProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

// interface SortObject {
//   schemaName: string;
//   order: number;
// }

// interface FilterObject {
//   category: string;
//   subCategory: string;
// }

const Transactions = (props: TransactionsProps) => {
  const { profile, setProfile } = props
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
  // const [sort, setSort] = useState<SortObject>({schemaName: 'formattedTransDate', order: 1})
  // const [filter, setFilter] = useState<FilterObject>({category: "", subCategory: ""})
  const [showModal, setShowModal] = useState<boolean>(false)
  
  const headers = [
    'Date',
    'Description',
    'Amount', 
    'Category',
    'Sub-Category'
  ]

  const handleAccountClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    const newAccountId = parseInt(evt.currentTarget.id)
    setSelectedAccount(newAccountId)
    setDisplayTransactions(profile.profileTransactions.filter(t => t.accountId === newAccountId))
  }

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const newSearch = evt.currentTarget.value
    setSearch(newSearch)
    setDisplayTransactions(profile.profileTransactions.filter(t => t.description.toLocaleLowerCase().includes(newSearch.toLowerCase())))
  }

  const handleUploadTransactions = async (transactionFormData: TransactionsFormData, accountId: number): Promise<void> => {
    setSearch('')
    const newTransactions = await accountsService.createTransactions(transactionFormData, accountId)
    const newTransactionState = [...profile.profileTransactions, ...newTransactions]
    setProfile({
      ...profile,
      profileTransactions: newTransactionState
    })
    setDisplayTransactions(newTransactionState.filter(
      t => t.accountId === profile.accounts[1].id
    ).sort(
      (a, b) => b.formattedTransDate.getTime() - a.formattedTransDate.getTime()
    ))
  }

  const handleUpdateTransaction = async (transaction: StateTransaction): Promise<void> => {
    const updatedTrans = await transactionsService.updateTransaction(transaction)
    setProfile({
      ...profile,
      profileTransactions: profile.profileTransactions.map(t => {
        return t.id === updatedTrans.id ? updatedTrans : t
      })
    })
    setDisplayTransactions(displayTransactions.map(t => {
      return t.id === updatedTrans.id ? updatedTrans : t
    }))
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
              onClick={(): void => setShowModal(!showModal)}
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
                <TransactionCard
                  key={t.id}
                  transaction={t}
                  categories={categories}
                  handleUpdateTransaction={handleUpdateTransaction}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <UploadTransModal
        show={showModal}
        setShowModal={setShowModal}
        selectedAccount={selectedAccount}
        handleUploadTransactions={handleUploadTransactions}
      />
    </main>
  )
}
 
export default Transactions