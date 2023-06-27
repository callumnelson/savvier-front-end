// css
import styles from './GoalCard.module.css'

// types
import { CategoryTrends } from '../../types/data'

interface CatOrder {
  order: number;
  name: string;
}

interface GoalCardProps {
  data: CategoryTrends;
  category: string;
  setCatOrder: (catOrder: CatOrder[]) => void;
}

const GoalCard = (props: GoalCardProps) => {
  const {category, data} = props

  return (
    <div className={styles.container}>
      <h4>{category}</h4>
      <div>
        <p>Goal:</p>
        <p>##</p>
      </div>
    </div>
  )
}
 
export default GoalCard