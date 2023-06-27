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

interface Goal {
  order: number;
  name: string;
  goal: number;
}

const Goals = (props: GoalsProps) => {
  const { profile } = props
  const [goals, setGoals] = useState<Goal[]>(
    [...profile.categories.map( (c, i) => {
      return {name: c.name, order: c.name === 'Income' ? -2 : i, goal: c.goal}
    }), {
      order: -1,
      name: 'Savings',
      goal: 0,
    }].sort((a, b) => a.order - b.order)
  )
  const data = dataService.computeCategoryTrends(profile.profileTransactions)

  const handleGoalChange = (goal: Goal): void => {
    setGoals(goals.map(g => g.name === goal.name ? goal : g))
  }
  
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
            {goals.map(goal => (
              !['Exclude', '-'].includes(goal.name) &&
              <GoalCard
                key={goal.order}
                goal={goal}
                data={data}
                handleGoalChange={handleGoalChange}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )


}
 
export default Goals