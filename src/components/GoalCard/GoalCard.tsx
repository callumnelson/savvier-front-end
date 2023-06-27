// npm modules
import { ChangeEvent, useState } from 'react';

// css
import styles from './GoalCard.module.css'

// types
import { CategoryTrends } from '../../types/data'
import currency from 'currency.js';

interface Goal {
  order: number;
  name: string;
  goal: number;
}

interface GoalCardProps {
  data: CategoryTrends;
  goal: Goal;
  goals: Goal[];
  handleGoalChange: (goal: Goal) => void;
}

// helpers
const myCurrency = (num: number): string => {
  return currency(num, {precision: 0, negativePattern: `(!#)`}).format()
}

const GoalCard = (props: GoalCardProps) => {
  const {goal, goals, data, handleGoalChange} = props
  const totalIncomeGoal = goals.find(g => g.name === 'Income')?.goal as number
  const totalSavingGoal = 1 - goals.reduce((a, c) => {
    return a += !['Income', 'Exclude', '-', 'Saving'].includes(c.name) ? c.goal : 0
  }, 0)
  const totalCategorySpend = data.data.reduce( (a, c) => {
    return a += c.data[goal.name] ? c.data[goal.name] : 0
  }, 0)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
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
      <div className={styles.goal}>
        {
          goal.name !== 'Saving' ?
          <input 
            type={'text'}
            name="goal"
            value={goal.name === 'Income' ? 
              currency(goal.goal, {precision:0}).format() 
              : 
              formatAsPercentage(goal.goal)}
            onChange={handleChange}
          />
          :
          <p>
            {formatAsPercentage(totalSavingGoal)}
          </p>
        }
      </div>
      <div className={styles.projected}>
        <h3>--</h3>
        <p>
          {goal.name === 'Income' ? 
            myCurrency(totalIncomeGoal)
            :
            goal.name === 'Saving' ? 
              myCurrency(totalSavingGoal * totalIncomeGoal)
              :
              myCurrency(-goal.goal * totalIncomeGoal)
          }
        </p>
        <p>
          {goal.name === 'Income' ? 
            myCurrency(totalIncomeGoal / 12)
            :
            goal.name === 'Saving' ? 
              myCurrency(totalSavingGoal * totalIncomeGoal / 12)
              :
              myCurrency(-goal.goal * totalIncomeGoal / 12)
          }
        </p>
      </div>
      <div className={styles.actual}>
        <h3>--</h3>
        <p>
          {goal.name === 'Income' ? 
            currency(totalIncomeGoal, {precision: 0, negativePattern: `(!#)`}).format()
            :
            goal.name === 'Saving' ? 
              currency(totalSavingGoal * totalIncomeGoal, { precision: 0}).format()
              :
              currency(goal.goal * totalIncomeGoal, {precision: 0}).format()
          }
        </p>
        <p>
          {goal.name === 'Income' ? 
            currency(totalIncomeGoal / 12, {precision: 0}).format()
            :
            goal.name === 'Saving' ? 
              currency(totalSavingGoal * totalIncomeGoal / 12, { precision: 0}).format()
              :
              currency(goal.goal * totalIncomeGoal / 12, {precision: 0}).format()
          }
        </p>
      </div>
    </div>
  )
}
 
export default GoalCard