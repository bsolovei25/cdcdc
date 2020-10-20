export interface IColumnChartStacked {
    plan: number;
    fact: number;
    iconId?: number;
    max?: number;
}

export interface IColumnChartStackedDataWS {
    items: IColumnChartStacked[];
    unitsOfMeasure?: string;
    selectedPeriod?: string;
    widgetType?: string;
}
