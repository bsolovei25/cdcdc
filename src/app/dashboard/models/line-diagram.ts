export interface ILineDiagram {
    name: string;
    count: number;
    curValue: number;
    planValue: number;
    units: string;
    critical: boolean;
}

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
}
