// npm modules
import { useState } from 'react'

// css
import styles from './SubNav.module.css'

// service

// types
import { Account } from '../../types/models'
import { AccountFormData } from '../../types/forms'
interface SubNavProps {
  accounts: Account[];
  selectedAccount: number | undefined;
  handleAccountClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
  handleAddAccount: (formData: AccountFormData) => Promise<void>; 
}

const SubNav = (props: SubNavProps) => {
  const { accounts, selectedAccount, handleAccountClick, handleAddAccount } = props
  const [accountForm, setAccountForm] = useState<AccountFormData>({
    name: '', 
    type: 'Checking'
  })
  const [addAccount, setAddAccount] = useState<boolean>(false)

  const handleFormSubmit = async (): Promise<void> => {
    await handleAddAccount(accountForm)
    setAddAccount(false)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccountForm({ ...accountForm, [evt.target.name]: evt.target.value })
  }

  return (
    <div className={styles.container}>
      <div>
        <h3>Accounts ({accounts?.length})</h3>
      </div>
      {accounts.map(acc => (
        <div 
          key={acc.id}
          id={acc.id.toString()}
          className={selectedAccount === acc.id ? styles.selected : styles.unselected}
          onClick={handleAccountClick}
        >
          <h4>{acc.name}</h4>
          <p>{acc.type}</p>
        </div>
      ))}
      <div 
        className={styles.unselected}
        onClick={() => setAddAccount(!addAccount)}
      >
        <h4>
          +Add Account
        </h4>
      </div>
      <form 
        onSubmit={handleFormSubmit}
        className={addAccount ? styles.showForm : styles.hideForm}
      >
        <input 
          type="text" 
          name="name"
          placeholder='Account name' 
          value={accountForm.name}
          onChange={handleChange}
        />
        <select 
          name="type" 
          id="type" 
          value={accountForm.type}
          onChange={handleChange}
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Other">Other</option>
        </select>
        <button type='button' onClick={() => setAddAccount(!addAccount)}>
          Cancel
        </button>
        <button type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}
 
export default SubNav