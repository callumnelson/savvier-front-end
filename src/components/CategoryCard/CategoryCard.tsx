// npm modules
import { useState } from 'react';

// css 
import styles from './CategoryCard.module.css'

// types
import { Category } from '../../types/models'
import { SubCatForm } from '../../types/forms';

interface CategoryCardProps {
  category: Category;
  handleAddSubCategory: (categoryId: number, subCatFormData: SubCatForm) => Promise<void>;
  handleDeleteSubCategory: (categoryId: number, subCategoryId: number) => Promise<void>;
}

const CategoryCard = (props: CategoryCardProps) => {
  const { category, handleAddSubCategory, handleDeleteSubCategory } = props
  const [subCatForm, setSubCatForm] = useState<SubCatForm>({
    name: ''
  })
  const [deleteSub, setDeleteSub] = useState<number | null>(null)

  const handleSubCatFormChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setSubCatForm({...subCatForm, [evt.currentTarget.name]: evt.currentTarget.value})
  }

  const handleSubCatFormSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await handleAddSubCategory(category.id, subCatForm)
      setSubCatForm({name: ''})
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteClick = async (evt: React.MouseEvent<HTMLSpanElement>): Promise<void> => {
    const subCategoryId = parseInt(evt.currentTarget.id)
    try {
      await handleDeleteSubCategory(category.id, subCategoryId)
      setDeleteSub(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{category.name}</h2>
      </div>
      <div className={styles.subCategories}>
        {category.subCategories.map(subCat => (
          !(deleteSub === subCat.id)  ? 
          <div 
            key={subCat.id}
          >
            <p>{subCat.name}</p>
            {
              category.name !== 'Uncoded' &&
              <span
                onClick={() => setDeleteSub(subCat.id)}
              >X</span>
            } 
          </div>
          :
          <div
            key={subCat.id}
          >
            <p
              style={{color: 'var(--leather)'}}
            >Are you sure?</p>
            <span
              onClick={() => setDeleteSub(null)}
              style={{color: 'var(--limeGreen)'}}
            >
              N
            </span>
            <span
              id={subCat.id.toString()}
              onClick={handleDeleteClick}
            >Y</span>
          </div>
        ))}
        {
          category.name !== 'Uncoded' && 
          <form
            onSubmit={handleSubCatFormSubmit}
          >
            <input 
              type="text" 
              name="name"
              value={subCatForm.name}
              placeholder='New sub-category...'
              onChange={handleSubCatFormChange}
            />
            <button type="submit">
              +
            </button>
          </form>
        }
      </div>
    </div>
  )
}
 
export default CategoryCard