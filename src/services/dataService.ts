import currency from "currency.js";
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
      const monthlyTrend = res.data[res.data.findIndex(t => t.monthString === monthYear)]
      if (t.category === 'Income') monthlyTrend.incomeNum += t.amount
      // don't count uncoded rows
      else if (t.category !== '-') monthlyTrend.spendingNum += t.amount
      monthlyTrend.incomeNum = Math.round(monthlyTrend.incomeNum)
      monthlyTrend.spendingNum = Math.round(monthlyTrend.spendingNum)
      monthlyTrend.savingsNum = monthlyTrend.incomeNum + monthlyTrend.spendingNum
      monthlyTrend.incomeStr = currency(monthlyTrend.incomeNum).format()
      monthlyTrend.spendingStr = currency(monthlyTrend.spendingNum).format()
      monthlyTrend.savingsStr = currency(monthlyTrend.savingsNum).format()
    } else {
      res.months.push(monthYear)
      const monthlyTrend: MonthlyTrend = {
        monthString: monthYear,
        incomeNum: 0,
        spendingNum: 0,
        savingsNum: 0,
        incomeStr: currency(0).format(),
        spendingStr: currency(0).format(),
        savingsStr: currency(0).format()
      }
      if (t.category === 'Income') monthlyTrend.incomeNum += t.amount
      // don't count uncoded rows
      else if (t.category !== '-') monthlyTrend.spendingNum += t.amount
      monthlyTrend.incomeNum = Math.round(monthlyTrend.incomeNum)
      monthlyTrend.spendingNum = Math.round(monthlyTrend.spendingNum)
      monthlyTrend.savingsNum = monthlyTrend.incomeNum - monthlyTrend.spendingNum
      res.data.push(monthlyTrend)
    }
    return res
  }, res)

  return res
}