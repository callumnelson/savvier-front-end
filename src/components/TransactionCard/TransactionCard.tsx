// npm modules
import currency from "currency.js"
import { ChangeEvent, useState } from "react"

// data
import { subCategories } from "../../data/categories"

// css
import styles from './TransactionCard.module.css'

// types
import { StateTransaction } from "../../types/models"
import { Category } from "../../types/forms"

interface TransactionCardProps {
  transaction: StateTransaction;
  categories: {value: string; schemaName: string}[];
  handleUpdateTransaction: (transaction: StateTransaction) => Promise<void>
  handleDeleteTransaction: (transaction: StateTransaction) => Promise<void>
}

const TransactionCard = (props: TransactionCardProps) => {
  const { transaction, categories, handleUpdateTransaction, handleDeleteTransaction } = props
  const [transState, setTransState] = useState<StateTransaction>(transaction)
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories.filter(c => c.value === transaction.category)[0])
  const [subcategoryOptions, setSubCategoryOptions] = useState<string[]>(subCategories[categories.filter(c => c.value === transaction.category)[0].schemaName])


  const handleChangeCategory = async (evt: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setTransState({...transState, [evt.currentTarget.name]: evt.currentTarget.value, subCategory: '-'})
    setSelectedCategory(categories.filter(c => c.schemaName === evt.currentTarget.selectedOptions[0].id)[0])
    setSubCategoryOptions(subCategories[evt.currentTarget.selectedOptions[0].id])
    await handleUpdateTransaction({...transState, [evt.currentTarget.name]: evt.currentTarget.value})
  }

  const handleChangeSubCategory = async (evt: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setTransState({...transState, [evt.currentTarget.name]: evt.currentTarget.value })
    await handleUpdateTransaction({...transState, [evt.currentTarget.name]: evt.currentTarget.value })
  }

  const handleClickDelete = async (): Promise<void> => {
    await handleDeleteTransaction(transState)
    //do stuff
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
          value={selectedCategory.value}
          onChange={handleChangeCategory}
        >
          {categories.map(c => (
            <option 
              key={c.schemaName}
              value={c.value}
              id={c.schemaName}
            >
              {c.value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select 
          name="subCategory" 
          id="subCategory"
          value={transState.subCategory}
          onChange={handleChangeSubCategory}
        >
          <option
            value='-'
          >
            -
          </option>
          {subcategoryOptions.map(sc => (
            <option 
              key={sc}
              value={sc}
            >
              {sc}
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