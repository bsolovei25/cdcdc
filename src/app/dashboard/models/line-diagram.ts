export interface ILineDiagramData {
    items: ILineDiagramDataItem[];
}

export interface ILineDiagramDataItem {
    name: string;
    percentage: number;
    value: number;
    upperBound: number;
    units: string;
    isCritical: boolean;
    lowerBound: number;
    lowerLimit: number;
    upperLimit: number;
    percentFact?: number;
}
