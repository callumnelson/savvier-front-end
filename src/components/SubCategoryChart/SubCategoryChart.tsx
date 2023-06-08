// npm modules
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts';
import randomColor from 'randomcolor'
import { useState } from 'react';

// types
import { Profile } from '../../types/models';
import { SubCategoryContainer, SubCategoryTrends } from '../../types/data';

// services
import * as dataService from '../../services/dataService'
import currency from 'currency.js';

interface SubCategoryChartProps {
  profile: Profile
}

const SubCategoryChart = (props: SubCategoryChartProps) => {
  const { profile } = props
  const [data, setData] = useState<SubCategoryContainer>(dataService.computeSubCategoryTrends(profile.profileTransactions))
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(data.data)[0])
  const [currentSubCatData, setCurrentSubCatData] = useState<SubCategoryTrends>(data.data[selectedCategory])

  console.log(selectedCategory)

  const colors = randomColor({
    count: currentSubCatData.subCategories.length, 
    hue: '#00FFFF', 
    luminosity: 'light'
  })

  return (
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
          tickFormatter={(x) => currency(x as number, {precision: 0}).format()}
        />
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
  )
}

export default SubCategoryChart