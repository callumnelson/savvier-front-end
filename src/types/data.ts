/* ---------==== custom data ====--------- */

export interface Chart {
  name: string;
  type: string;
  id: number;
}

export interface OverallTrends {
  months: string[];
  data: OverallTrend[];
}

export interface OverallTrend {
  monthString: string;
  data: {
    incomeNum: number;
    spendingNum: number;
    savingsNum: number;
  }
}

export interface CategoryTrends {
  months: string[];
  data: CategoryTrend[];
  categories: string[];
}

export interface CategoryTrend {
  monthString: string;
  data: {
    [key: string]: number;
  }
}