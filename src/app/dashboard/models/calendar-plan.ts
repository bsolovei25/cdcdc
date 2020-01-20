export interface ICalendarPlanGraph {
    plan: number;
    lowerBorder: number;
    higherBorder: number;
    curValue: number;
    maxValue: number;
    lowerValue?: number;
    higherValue?: number;
}

export interface ICalendarPlanData {
    name: string;
    deviation: number;
    isBetter: boolean;
}
