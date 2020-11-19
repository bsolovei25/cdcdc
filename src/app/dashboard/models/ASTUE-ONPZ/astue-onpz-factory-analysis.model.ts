export interface IAstueOnpzFactoryAnalysis {
    groups: IAstueOnpzFactoryAnalysisGroup[];
    legend: number[];
}

export interface IAstueOnpzFactoryAnalysisGroup {
    title: string;
    bars: IAstueOnpzFactoryAnalysisBar[];
}

export interface IAstueOnpzFactoryAnalysisBar {
    value: number;
    title: string;
    lowLevel: number;
    topLevel: number;
    type: IAstueOnpzFactoryAnalysisBarType;
}

export enum IAstueOnpzFactoryAnalysisBarType {
    Summary = 'sum',
    Deviation = 'bad',
    Normal = 'norm',
}
