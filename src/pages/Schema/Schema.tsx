// css
import styles from './Schema.module.css'

// components
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PageHeader from '../../components/PageHeader/PageHeader';

// services
import * as categoriesService from '../../services/categoriesService'
import * as subCategoriesService from '../../services/subCategoriesService'

// types
import { Profile, SubCategory } from '../../types/models';
import { SubCatForm } from '../../types/forms';

interface SchemaProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const Schema = (props: SchemaProps) => {
  const { profile, setProfile } = props

  const handleAddSubCategory = async (categoryId: number, subCatFormData: SubCatForm): Promise<void> => {
    const newSubCategory: SubCategory = await categoriesService.createSubCategory(categoryId, subCatFormData)
    setProfile({...profile, categories: profile.categories.map(cat => (
      cat.id === categoryId ? 
        {...cat, subCategories: [...cat.subCategories, newSubCategory]} 
        :
        cat
    ))})
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
      <section>
        <div className={styles.headers}>
          <h2>Categories</h2>
          <h3>Sub Categories</h3>
        </div>
        <div className={styles.data}>
          {profile.categories.map(cat => (
            <CategoryCard
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