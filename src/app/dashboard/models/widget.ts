export interface Widget {
  id: number;
  name: string;
  code: string;
  units: string;
  widgetType: string;
  widgetOptions: LineChartOptions;
}


export interface LineChartOptions {
  planLineType: string; //curveStepAfter, curveMonotoneX, curveLinear
  factLineType: string; //curveStepAfter, curveMonotoneX, curveLinear
  lowerLimitLineType: string; //curveStepAfter, curveMonotoneX, curveLinear
  upperLimitLineType: string; //curveStepAfter, curveMonotoneX, curveLinear
}

export interface LineChartData {
  totals: LineChartTotals;
  graphs: LineChartGraph[]
}

export interface LineChartTotals {
  plan: number;
  fact: number;
  deviation: number;
}


export interface LineChartGraph {
  graphType: string; //fact, plan, upperLimit, lowerLimit
  values: LineChartGraphValue[];
}

export interface LineChartGraphValue {
  date: Date;
  value: number;
}
