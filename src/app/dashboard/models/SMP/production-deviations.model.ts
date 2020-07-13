export interface IProductionDeviationsGraph {
    plan?: number;
    graphType: 'baseline' | 'normal';
    graphTitle: string;
    graphUnits: string;
    limits: {
        upValue: number;
        upType: 'danger' | 'warning';
        downValue?: number;
        downType?: 'danger' | 'warning';
    };
    columns: IProductionDeviationsColumn[];
}

export interface IProductionDeviationsColumn {
    date: Date;
    maxValue: number;
    fact: number;
    plan?: number;
    direction?: 'up' | 'down';
    limit?: {
        value: number;
        type: 'danger' | 'warning';
    };
}

export interface IGeometryParameters {
    height: number;
    width: number;
    padding?: number;
}

export type LineType = 'danger' | 'warning' | 'plan' | 'fact';
