import { CategoryTrend, CategoryTrends, OverallTrend, OverallTrends } from "../types/data";
import { StateTransaction } from "../types/models";

// Helper function to return monthly trends data
export const computeOverallTrends = (transactions: StateTransaction[]): OverallTrends => {

  const res: OverallTrends = {
    months: [],
    data: [],
  }

  transactions.reduce( (res, t) => {
    const monthYear = `
      ${t.formattedTransDate.getMonth()+1 < 10 ? '0': ''}${t.formattedTransDate.getMonth()+1} / 
      ${t.formattedTransDate.getFullYear().toString().slice(2)}
    `
    if (res.months.includes(monthYear)) {
      //The last item in the array is the month we're working on right now
      const monthlyTrend = res.data[res.data.findIndex(t => t.monthString === monthYear)]
      if (t.category === 'Income') monthlyTrend.data.incomeNum += t.amount
      // don't count uncoded rows
      else if (t.category !== 'Exclude') monthlyTrend.data.spendingNum += t.amount
      monthlyTrend.data.incomeNum = Math.round(monthlyTrend.data.incomeNum)
      monthlyTrend.data.spendingNum = Math.round(monthlyTrend.data.spendingNum)
      monthlyTrend.data.savingsNum = monthlyTrend.data.incomeNum + monthlyTrend.data.spendingNum
    } else {
      res.months.push(monthYear)
      const monthlyTrend: OverallTrend = {
        monthString: monthYear,
        data: {
          incomeNum: 0,
          spendingNum: 0,
          savingsNum: 0,
        }
      }
      if (t.category === 'Income') monthlyTrend.data.incomeNum += t.amount
      // don't count uncoded rows
      else if (t.category !== 'Exclude') monthlyTrend.data.spendingNum += t.amount
      monthlyTrend.data.incomeNum = Math.round(monthlyTrend.data.incomeNum)
      monthlyTrend.data.spendingNum = Math.round(monthlyTrend.data.spendingNum)
      monthlyTrend.data.savingsNum = monthlyTrend.data.incomeNum - monthlyTrend.data.spendingNum
      res.data.push(monthlyTrend)
    }
    return res
  }, res)

  return res
}

// Compute monthly trends by category
export const computeCategoryTrends = (transactions: StateTransaction[]): CategoryTrends => {
  const res: CategoryTrends = {
    months: [],
    categories: [],
    data: [],
  }
  
  transactions.reduce( (res, t) => {
    const monthYear = `
    ${t.formattedTransDate.getMonth()+1 < 10 ? '0': ''}${t.formattedTransDate.getMonth()+1} / 
    ${t.formattedTransDate.getFullYear().toString().slice(2)}
    `
if (res.months.includes(monthYear)) {
  //The last item in the array is the month we're working on right now
  const monthlyTrend = res.data[res.data.findIndex(t => t.monthString === monthYear)]
  if (!['Income', 'Exclude', '-'].includes(t.category)) {
    if (!res.categories.includes(t.category)) res.categories.push(t.category)
    if (monthlyTrend.data[t.category]){
      monthlyTrend.data[t.category] += t.amount
    } 
    else monthlyTrend.data[t.category] = t.amount
  }
} else {
  res.months.push(monthYear)
  const monthlyTrend: CategoryTrend = {
    monthString: monthYear,
    data: {}
  }
  if (!['Income', 'Exclude', '-'].includes(t.category)) {
    if (!res.categories.includes(t.category)) res.categories.push(t.category)
    monthlyTrend.data[t.category] = t.amount
  }
  res.data.push(monthlyTrend)
}
return res
}, res)


  return res
}