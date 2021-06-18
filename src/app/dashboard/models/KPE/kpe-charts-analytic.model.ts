export interface IKpeChartsAnalyticEntryStates {
    manufacture: any;
    unit: any;
    element: any; // TODO: refactor name
    viewType: any;
    chartType: any;
    engUnit: any;
    dateInterval: any;
    isSync: any;
}

export interface IKpeChartsAnalyticSharedStates {
    uniqueId: string;
    value: boolean;
    dateStart: Date | null;
    dateEnd: Date | null;
}

export interface IKpeChartsAnalyticGraphs {
    data: IKpeChartsAnalyticGraphData[],
    units: string;
}

export interface IKpeChartsAnalyticGraphData {
    graph: IKpeChartsAnalyticGraphPoint[],
    graphStyle: string,
    graphType: string
}

export interface IKpeChartsAnalyticGraphPoint {
    value: number,
    timeStamp: string
}

export interface IKpeChartsAnalyticCardValues {
    factValue: number,
    planValue: number,
    deviation: number
}

export interface IKpeChartsAnalyticDatesInterval {
    dateStart: Date,
    dateEnd: Date
}
