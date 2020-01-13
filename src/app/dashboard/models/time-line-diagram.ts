export interface timeLineData {
  values: timeLineItem[];
}

export interface timeLineItem {
  dropTimeNext: number;
  dropTimeLast: number;
  dropTitle: string;
}
