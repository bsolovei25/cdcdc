/// region response start
export interface IAstueOnpzFactoryAnalysisBarResponse {
    sections: IAstueOnpzFactoryAnalysisBarResponseSection[];
    info: string;
}

export interface IAstueOnpzFactoryAnalysisBarResponseSection {
    mainDiagram: IAstueOnpzFactoryAnalysisBarResponseDiagram;
    groups: IAstueOnpzFactoryAnalysisBarResponseGroup[];
}

export interface IAstueOnpzFactoryAnalysisBarResponseGroup {
    title: string;
    diagrams: IAstueOnpzFactoryAnalysisBarResponseDiagram[];
}

export interface IAstueOnpzFactoryAnalysisBarResponseDiagram {
    title: string;
    value: number;
}
/// region response end

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
