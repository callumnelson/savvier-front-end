// npm modules
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, Bar } from 'recharts';

// types
import { Profile } from '../../types/models';

// services
import * as dataService from '../../services/dataService'
import currency from 'currency.js';

// css
import styles from './OverallTrendChart.module.css'

interface OverallTrendChartProps {
  profile: Profile
}

const OverallTrendChart = (props: OverallTrendChartProps) => {
  const { profile } = props
  
  const data = dataService.computeOverallTrends(profile.profileTransactions)

  const gradientOffset = () => {
    const dataMax = Math.max(...data.data.map((i) => i.data.savingsNum));
    const dataMin = Math.min(...data.data.map((i) => i.data.savingsNum));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  return (
    <div className={styles.container}>
    <h3>Monthly spending by Sub-Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={data.data}
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
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Bar type="monotone" dataKey="data.incomeNum" stroke="#828aca" fill="#828aca" name='Income'/>
          <Bar type="monotone" dataKey="data.spendingNum" fill= "#307fb8" stroke="#307fb8" name='Spending'/>
          <Area type="monotone" dataKey="data.savingsNum" fill="url(#splitColor)" activeDot={{ r: 8 }} name='Savings' stroke="green"/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OverallTrendChart