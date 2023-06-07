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
import { AccountFormData, TransactionsFormData } from '../../types/forms';
import TransactionCard from '../../components/TransactionCard/TransactionCard';

interface TransactionsProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const Transactions = (props: TransactionsProps) => {
  const { profile, setProfile } = props
  const [
    selectedAccount, setSelectedAccount
  ] = useState<number>(profile.accounts[0].id)
  const [displayTransactions, setDisplayTransactions
  ] = useState<StateTransaction[]>(
    profile.profileTransactions.filter(
      t => t.accountId === profile.accounts[0].id
    ).sort( (a, b) => b.formattedTransDate.getTime() - a.formattedTransDate.getTime())
  )
  const [search, setSearch] = useState<string>('')
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
    setDisplayTransactions(
      profile.profileTransactions.filter(t => (t.description.toLocaleLowerCase().includes(newSearch.toLowerCase()) 
      ||
      t.category.toLowerCase().includes(newSearch.toLowerCase())
      ||
      t.subCategory.toLowerCase().includes(newSearch.toLowerCase()))
      && 
      t.accountId === selectedAccount)
    )
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
      t => t.accountId === selectedAccount
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

  const handleDeleteTransaction = async (deletedTrans: StateTransaction): Promise<void> => {
    try {
      await transactionsService.deleteTransaction(deletedTrans)
      setProfile({
        ...profile,
        profileTransactions: profile.profileTransactions.filter(t => {
          return t.id !== deletedTrans.id
        })
      })
      setDisplayTransactions(displayTransactions.filter(t => {
        return t.id !== deletedTrans.id
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddAccount = async (formData: AccountFormData): Promise<void> => {
    const newAccount = await accountsService.createAccount(formData)
    setProfile({
      ...profile,
      accounts: [...profile.accounts, newAccount]
    })
  }

  return (
    <main className={styles.container}>
      <PageHeader pageName='Transactions'></PageHeader>
      <section>
        <SubNav 
          accounts={profile.accounts}
          selectedAccount={selectedAccount}
          handleAccountClick={handleAccountClick}
          handleAddAccount={handleAddAccount}
        />
        <div className={styles.tableContainer}>
        <nav>
          <h4>
            Viewing {displayTransactions.length} transactions
          </h4>
          <div>
            <button
              onClick={(): void => setShowModal(!showModal)}
            >
              Add Transactions
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
              <div></div>
            </div>
            <div className={styles.rows}>
              {displayTransactions.map(t => (
                <TransactionCard
                  key={t.id}
                  transaction={t}
                  categories={categories}
                  handleUpdateTransaction={handleUpdateTransaction}
                  handleDeleteTransaction={handleDeleteTransaction}
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