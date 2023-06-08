// css
import styles from './Schema.module.css'

// components
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PageHeader from '../../components/PageHeader/PageHeader';

// services
import * as categoriesService from '../../services/categoriesService'
import * as subCategoriesService from '../../services/subCategoriesService'

// types
import { Category, Profile, SubCategory } from '../../types/models';
import { CatForm, SubCatForm } from '../../types/forms';
import { useState } from 'react';

interface SchemaProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const Schema = (props: SchemaProps) => {
  const { profile, setProfile } = props
  const [catForm, setCatForm] = useState<CatForm>({
    name: ''
  })

  const handleCatFormChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setCatForm({...catForm, [evt.currentTarget.name]: evt.currentTarget.value})
  }

  const handleAddSubCategory = async (categoryId: number, subCatFormData: SubCatForm): Promise<void> => {
    const newSubCategory: SubCategory = await categoriesService.createSubCategory(categoryId, subCatFormData)
    setProfile({...profile, categories: profile.categories.map(cat => (
      cat.id === categoryId ? 
        {...cat, subCategories: [...cat.subCategories, newSubCategory]} 
        :
        cat
    ))})
  }
  
  const handleAddCategory = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    const newCategory: Category = await categoriesService.create(catForm)
    setProfile({...profile, categories: [newCategory, ...profile.categories]})
    setCatForm({name: ''})
  }

  const handleDeleteSubCategory = async(categoryId: number, subCategoryId: number): Promise<void> => {
    await subCategoriesService.deleteSubCategory(subCategoryId)
    setProfile({...profile, categories: profile.categories.map(cat => (
      cat.id === categoryId ? 
        {...cat, subCategories: cat.subCategories.filter(s => s.id !== subCategoryId)} 
        :
        cat
    ))})
  }

  return (
    <main className={styles.container}>
      <PageHeader
        pageName='Schema'
      />
      <p>Use this page to add or edit the categories and sub-categories into which you will code your expenses and earnings. <strong>Note that deleting a sub-category will reset coding for any transactions previously coded to that sub-category.</strong></p>
      <section>
        <div className={styles.data}>
          <div className={styles.newCategory}>
            <form
              onSubmit={handleAddCategory}
            >
              <input 
                type="text" 
                name="name"
                value={catForm.name}
                placeholder='New category...'
                onChange={handleCatFormChange}
              />
              <button type="submit">
                +
              </button>
            </form>
          </div>
          {profile.categories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              handleAddSubCategory={handleAddSubCategory}
              handleDeleteSubCategory={handleDeleteSubCategory}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
 
export default Schema