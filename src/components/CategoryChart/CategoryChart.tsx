// npm modules
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts';
import randomColor from 'randomcolor'

// types
import { Profile } from '../../types/models';

// services
import * as dataService from '../../services/dataService'
import currency from 'currency.js';

interface OverallTrendChartProps {
  profile: Profile
}

const OverallTrendChart = (props: OverallTrendChartProps) => {
  const { profile } = props
  
  const data = dataService.computeCategoryTrends(profile.profileTransactions)

  const colors = randomColor({
    count: data.categories.length, 
    hue: 'blue', 
    luminosity: 'light'
  })

  return (
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
          tickFormatter={(x) => currency(x as number, {precision: 0}).format()}
        />
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
  )
}

export default OverallTrendChart