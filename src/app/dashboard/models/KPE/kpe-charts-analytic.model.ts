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
