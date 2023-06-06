/* ---------==== custom data ====--------- */

export interface MonthlyTrends {
  months: string[];
  data: MonthlyTrend[];
}

export interface MonthlyTrend {
  monthString: string;
  incomeNum: number;
  spendingNum: number;
  savingsNum: number;
  savingsStr: string;
  incomeStr: string;
  spendingStr: string;
}