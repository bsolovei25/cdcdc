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
