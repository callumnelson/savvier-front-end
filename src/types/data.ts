/* ---------==== custom data ====--------- */

export interface MonthlyTrends {
  months: string[];
  data: MonthlyTrend[];
}

export interface MonthlyTrend {
  monthString: string;
  income: number;
  spending: number;
}