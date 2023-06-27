// css
import styles from './GoalsSubNav.module.css'

// types
import { CategoryTrends } from '../../types/data';
interface GoalsSubNavProps {
  data: CategoryTrends;
}

const GoalsSubNav = (props: GoalsSubNavProps) => {
  const { data } = props
  
  return (
    <div className={styles.container}>
      <div>
        <h3>Goal</h3>
      </div>
      <div>
        <h3>Budget</h3>
        <p>Annual</p>
        <p>One Month</p>
      </div>
      <div>
        <h3>Actual</h3>
        <p>Annual</p>
        <p>One Month (Avg)</p>
      </div>
      <div>
        <h3>Breakdown</h3>
        {data.months.map(m => (
          <p>{m}</p>
        ))}
      </div>
    </div>
  )
}

export default GoalsSubNav