// npm modules
import { useState } from 'react'

// css
import styles from './Goals.module.css'

// services
import * as dataService from '../../services/dataService'

// components
import PageHeader from '../../components/PageHeader/PageHeader'
import { Profile } from '../../types/models'
import GoalCard from '../../components/GoalCard/GoalCard';
import GoalsSubNav from '../../components/GoalsSubNav/GoalsSubNav'

// types
interface GoalsProps {
  profile: Profile;
}

interface CatOrder {
  order: number;
  name: string;
}

const Goals = (props: GoalsProps) => {
  const { profile } = props
  const [catOrder, setCatOrder] = useState<CatOrder[]>(
    [...profile.categories.map( (c, i) => {
      return {name: c.name, order: c.name === 'Income' ? -2 : i}
    }), {
      order: -1,
      name: 'Savings'
    }].sort((a, b) => a.order - b.order)
  )
  const data = dataService.computeCategoryTrends(profile.profileTransactions)
  
  return (
    <main className={styles.container}>
      <PageHeader pageName='Goals'></PageHeader>
      <section>
        <GoalsSubNav 
          data={data}
          />
        <div className={styles.table}>
          <nav> Goals Nav </nav>
          <div className={styles.dataContainer}>
            {catOrder.map(cat => (
              !['Exclude', '-'].includes(cat.name) &&
              <GoalCard 
                category={cat.name}
                data={data}
                setCatOrder={setCatOrder}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )


}
 
export default Goals