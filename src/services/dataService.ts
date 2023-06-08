import { CategoryTrend, CategoryTrends, OverallTrend, OverallTrends, SubCategoryContainer, SubCategoryTrend, SubCategoryTrends } from "../types/data";
import { StateTransaction } from "../types/models";

// Helper function to return monthly trends data
export const computeOverallTrends = (transactions: StateTransaction[]): OverallTrends => {

  const res: OverallTrends = {
    months: [],
    data: [],
  }

  transactions.reduce( (res, t) => {
    const monthYear = `${t.formattedTransDate.getMonth()+1 < 10 ? '0': ''}${t.formattedTransDate.getMonth()+1} / ${t.formattedTransDate.getFullYear().toString().slice(2)}`
    if (res.months.includes(monthYear)) {
      //The last item in the array is the month we're working on right now
      const monthlyTrend = res.data[res.data.findIndex(trend => trend.monthString === monthYear)]
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
    const monthYear = `${t.formattedTransDate.getMonth()+1 < 10 ? '0': ''}${t.formattedTransDate.getMonth()+1} / ${t.formattedTransDate.getFullYear().toString().slice(2)}`
  if (res.months.includes(monthYear)) {
    //The last item in the array is the month we're working on right now
    const monthlyTrend = res.data[res.data.findIndex(trend => trend.monthString === monthYear)]
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

export const computeSubCategoryTrends = (transactions: StateTransaction[]): SubCategoryContainer => {
  const res: SubCategoryContainer = {
    data: {},
  }

  transactions.sort((a, b) => a.id - b.id)

  transactions.reduce( (res, t) => {
    if (!['Income', 'Exclude', '-'].includes(t.category)){
      const monthYear = `${t.formattedTransDate.getMonth()+1 < 10 ? '0': ''}${t.formattedTransDate.getMonth()+1} / ${t.formattedTransDate.getFullYear().toString().slice(2)}`
      // If there's an array for category
      if (res.data[t.category]){
        const subCategoryTrends = res.data[t.category]
        // If the subCategory array has the given month already
        if (subCategoryTrends.months.includes(monthYear)){
          const monthlyTrend = subCategoryTrends.data[subCategoryTrends.data.findIndex(trend => trend.monthString === monthYear)]
          //If the subCategory doesn't exist add it to our list and set the amount
          if (!subCategoryTrends.subCategories.includes(t.subCategory)) {
            subCategoryTrends.subCategories.push(t.subCategory)
          }
          if (!monthlyTrend.data[t.subCategory]){
            monthlyTrend.data[t.subCategory] = t.amount
          } 
          else monthlyTrend.data[t.subCategory] += t.amount
        // New month means new monthTrend object
        }else {
          subCategoryTrends.months.push(monthYear)
          const monthlyTrend: SubCategoryTrend = {
            monthString: monthYear,
            data: {
              [t.subCategory]: t.amount
            }
          }
          if (!subCategoryTrends.subCategories.includes(t.subCategory)) {
            subCategoryTrends.subCategories.push(t.subCategory) 
          }
          subCategoryTrends.data.push(monthlyTrend)
        }
      }else {
        //Create a new monthly trends object with the first monthly trend
        res.data[t.category] = {
          months: [monthYear],
          subCategories: [t.subCategory],
          data: [{
            monthString: monthYear,
            data: {
              [t.subCategory]: t.amount,
            }
          }]
        }
      }
    }
    return res
  }, res)
  return res
}