// npm modules
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// types
import { Profile } from '../../types/models';

// services
import * as dataService from '../../services/dataService'

interface OverallTrendChartProps {
  profile: Profile
}

const OverallTrendChart = (props: OverallTrendChartProps) => {
  const { profile } = props
  
  const data = dataService.computeMonthlyTrends(profile.profileTransactions)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <XAxis dataKey="monthString" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="incomeNum" stroke="#828aca" name='Income'/>
        <Line type="monotone" dataKey="savingsNum" stroke="#82ca9d" activeDot={{ r: 8 }} name='Savings'/>
        <Line type="monotone" dataKey="spendingNum" stroke="#c73434" name='Spending'/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default OverallTrendChart