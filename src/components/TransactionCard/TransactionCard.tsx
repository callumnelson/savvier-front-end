// npm modules
import currency from "currency.js"
import { ChangeEvent, useState } from "react"

// css
import styles from './TransactionCard.module.css'

// types
import { StateTransaction } from "../../types/models"

interface TransactionCardProps {
  transaction: StateTransaction;
  categories: string[];
  handleUpdateTransaction: (transaction: StateTransaction) => Promise<void>;
}

const TransactionCard = (props: TransactionCardProps) => {
  const { transaction, categories, handleUpdateTransaction } = props
  const [transState, setTransState] = useState<StateTransaction>(transaction)

  const handleChangeCategory = async (evt: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setTransState({...transState, [evt.currentTarget.name]: evt.currentTarget.value})
    await handleUpdateTransaction({...transState, [evt.currentTarget.name]: evt.currentTarget.value})
  }

  return (
    <div key={transaction.id} className={styles.row}>
      <div><p>{transaction.formattedTransDate?.toLocaleDateString()}</p></div>
      <div><p>{transaction.description}</p></div>
      <div><p>{currency(transaction.amount).format()}</p></div>
      <div>
        <select 
          name="category" 
          id="category"
          value={transState.category}
          onChange={handleChangeCategory}
        >
          {categories.map(c => (
            <option 
              key={c}
              value={c}
            >
              {c}
            </option>
          ))}
        </select>
      </div>
      <div><p>{transaction.subCategory}</p></div>
    </div>
  )
}
 
export default TransactionCard