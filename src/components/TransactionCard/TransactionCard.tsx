// npm modules
import currency from "currency.js"
import { ChangeEvent, useState } from "react"

// css
import styles from './TransactionCard.module.css'

// types
import { Profile, StateTransaction, SubCategory } from "../../types/models"
import { Category } from "../../types/models"

interface TransactionCardProps {
  transaction: StateTransaction;
  profile: Profile;
  handleUpdateTransaction: (transaction: StateTransaction) => Promise<void>
  handleDeleteTransaction: (transaction: StateTransaction) => Promise<void>
}

const TransactionCard = (props: TransactionCardProps) => {
  const {transaction, profile, handleUpdateTransaction, handleDeleteTransaction } = props
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    profile.categories.filter(c => c.name === transaction.category)[0]
  )
  const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>(
    profile.categories.filter(c => c.name === selectedCategory.name)[0].subCategories
    .sort((a, b) => a.name > b.name ? 1 : -1)  
  )


  const handleChangeCategory = async (evt: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const newSelectedCategory = profile.categories.filter(c => c.name === evt.currentTarget.selectedOptions[0].id)[0]
    setSelectedCategory(newSelectedCategory)
    setSubCategoryOptions(
      [...newSelectedCategory.subCategories].sort((a, b) => a.name > b.name ? 1 : -1)
    )
    await handleUpdateTransaction({
      ...profile.profileTransactions.filter(t => t.id === transaction.id)[0], [evt.currentTarget.name]: evt.currentTarget.value, subCategory: '-'
    })
  }

  const handleChangeSubCategory = async (evt: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    await handleUpdateTransaction({
      ...profile.profileTransactions.filter(t => t.id === transaction.id)[0], [evt.currentTarget.name]: evt.currentTarget.value 
    })
  }

  const handleClickDelete = async (): Promise<void> => {
    await handleDeleteTransaction(transaction)
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
          value={selectedCategory.name}
          onChange={handleChangeCategory}
        >
          {profile.categories.map(c => (
            <option 
              key={c.name}
              value={c.name}
              id={c.name}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select 
          name="subCategory" 
          id="subCategory"
          value={transaction.subCategory}
          onChange={handleChangeSubCategory}
        >
          {subcategoryOptions.map(sc => (
            <option 
              key={sc.name}
              value={sc.name}
            >
              {sc.name}
            </option>
          ))}
        </select>
      </div>
      <div 
        className={styles.delete}
        onClick={handleClickDelete}
      >
        X
      </div>
    </div>
  )
}
 
export default TransactionCard