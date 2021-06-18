export interface IManufactureUnitGroupIndicator {
    id: string;
    name: string;
    order: number;
}

export interface IManufactureUnitGroup {
    id: string;
    name: string;
    indicators: IManufactureUnitGroupIndicator[];
}

export interface IManufactureUnit {
    id: string;
    name: string;
    groups: IManufactureUnitGroup[];
}

export interface IManufacture {
    id: string;
    name: string;
    units: IManufactureUnit[];
}

export interface IChartAnalytic {
    isHistoricalDataSupported: boolean;
    manufactures: IManufacture[];
    subscriptionOptions: { timeStamp: number };
    title: string;
    widgetType: string;
}
