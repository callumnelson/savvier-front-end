// npm modules
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ReferenceLine } from 'recharts';
import randomColor from 'randomcolor'

// types
import { Profile } from '../../types/models';

// services
import * as dataService from '../../services/dataService'
import currency from 'currency.js';

// css
import styles from './CategoryChart.module.css'

interface CategoryChartProps {
  profile: Profile
}

const CategoryChart = (props: CategoryChartProps) => {
  const { profile } = props
  const data = dataService.computeCategoryTrends(profile.profileTransactions)

  const colors = randomColor({
    count: data.categories.length, 
    hue: '#00FFFF', 
    luminosity: 'light'
  })

  return (
    <div className={styles.container}>
    <h3>Monthly Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data.data}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="monthString" 
          />
          <YAxis
            domain={
              [(dataMin:number) => (Math.min(Math.floor(dataMin / 2500) * 2500, -2500)), 
              (dataMax:number) => (Math.max(Math.ceil(dataMax / 2500)*2500), 2500)]
            }

            tickFormatter={(x) => currency(x as number, {precision: 0}).format()}
          />
          <ReferenceLine y={0} stroke="white" />
          <Tooltip 
            formatter={(x) => currency(x as number, {precision: 0}).format()}
            contentStyle={{ color: '#dfdbd8', backgroundColor: '#303030', fontWeight: 600}}
            cursor={{fill: '#303030'}}
            
          />
          <Legend />
          {data.categories.map( (cat, idx) => (
            <Bar 
              key={cat}
              type="monotone" 
              dataKey={`data.${cat}`}
              name={cat}
              fill={colors[idx]}
              stackId={'b'}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
  </div>
  )
}

export default CategoryChart