export interface TimeLineData {
  values: TimeLineItem[];
  title?: string;
  widgetType?: string;
}

export interface TimeLineItem {
  dropTimeNext: number;
  dropTimeLast: number;
  dropTitle: string;
}
