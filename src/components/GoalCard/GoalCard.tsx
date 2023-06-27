// npm modules
import { ChangeEvent, useState } from 'react';

// css
import styles from './GoalCard.module.css'

// types
import { CategoryTrends } from '../../types/data'
import { Category, Profile } from '../../types/models';
import currency from 'currency.js';

interface Goal {
  order: number;
  name: string;
  goal: number;
}

interface GoalCardProps {
  data: CategoryTrends;
  goal: Goal;
  handleGoalChange: (goal: Goal) => void;
}

const GoalCard = (props: GoalCardProps) => {
  const {goal, data, handleGoalChange} = props

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    console.log(evt.currentTarget.value)
    if (goal.name === 'Income') handleGoalChange({...goal, goal: currency(evt.currentTarget.value).value})
    else if (evt.currentTarget.value === '%') handleGoalChange({...goal, goal: 0})
    else handleGoalChange({...goal, goal: parseFloat(evt.currentTarget.value.replaceAll(',','')) / 100})
  }

  const formatAsPercentage = (num: number): string => {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }

  return (
    <div className={styles.container}>
      <h4>{goal.name}</h4>
      <div>
        {
          goal.name !== 'Savings' &&
          <input 
            type={'text'}
            name="goal"
            value={goal.name === 'Income' ? 
              currency(goal.goal, {precision:0}).format() 
              : 
              formatAsPercentage(goal.goal)}
            onChange={handleChange}
          />
        }
      </div>
    </div>
  )
}
 
export default GoalCard