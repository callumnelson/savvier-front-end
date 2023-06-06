import { MonthlyTrend, MonthlyTrends } from "../types/data";
import { StateTransaction } from "../types/models";

// Helper function to return monthly trends data
export const computeMonthlyTrends = (transactions: StateTransaction[]): MonthlyTrends => {

  const res: MonthlyTrends = {
    months: [],
    data: [],
  }

  transactions.reduce( (res, t) => {
    const monthYear = `${t.formattedTransDate.getMonth()+1}, ${t.formattedTransDate.getFullYear()}`
    if (res.months.includes(monthYear)) {
      //The last item in the array is the month we're working on right now
      res.data[res.data.length - 1]
    } else {
      res.months.push(monthYear)
      const monthlyTrend: MonthlyTrend = {
        monthString: monthYear,
        income: 0,
        spending: 0,
      }
      if (t.category === 'Income') monthlyTrend.income += t.amount
      else monthlyTrend.spending += t.amount
      res.data.push(monthlyTrend)
    }
    return res
  }, res)

  return res
}