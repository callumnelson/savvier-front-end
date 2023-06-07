/* ---------==== custom data ====--------- */

export interface Chart {
  name: string;
  type: string;
  id: number;
}

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