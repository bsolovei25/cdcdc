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

export interface TimeLineDataInput {
  values: TimeLineItemInput[];
  title?: string;
  widgetType?: string;
}

export interface TimeLineItemInput {
  dropTimeNext: string;
  dropTimeLast: string;
  dropTitle: string;
}
