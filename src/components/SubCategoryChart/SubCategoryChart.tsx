// npm modules
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ReferenceLine } from 'recharts';
import randomColor from 'randomcolor'
import { useState } from 'react';

// types
import { Profile } from '../../types/models';
import { SubCategoryContainer, SubCategoryTrends } from '../../types/data';

// services
import * as dataService from '../../services/dataService'
import currency from 'currency.js';

// css
import styles from './SubCategoryChart.module.css'

interface SubCategoryChartProps {
  profile: Profile
}

const SubCategoryChart = (props: SubCategoryChartProps) => {
  const { profile } = props
  const [data, setData] = useState<SubCategoryContainer>(dataService.computeSubCategoryTrends(profile.profileTransactions))
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(data.data)[0])
  const [currentSubCatData, setCurrentSubCatData] = useState<SubCategoryTrends>(data.data[selectedCategory])

  const colors = randomColor({
    count: currentSubCatData.subCategories.length, 
    hue: 'orange', 
    luminosity: 'light'
  })

  const handleSelectCategory = (evt: React.ChangeEvent<HTMLSelectElement>):void => {
    setSelectedCategory(evt.currentTarget.value)
    setCurrentSubCatData(data.data[evt.currentTarget.value])
    setData({...data})
  }

  return (
    <div className={styles.container}>
      <h3>Monthly Spending by Sub-Category</h3>
      <select 
        name="category" 
        onChange={handleSelectCategory}
        value={selectedCategory}
      >
        {Object.keys(data.data).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={currentSubCatData.data}
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
          {currentSubCatData.subCategories.map( (cat, idx) => (
            <Bar 
              key={cat}
              type="monotone" 
              dataKey={`data[${cat}]`}
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

export default SubCategoryChart