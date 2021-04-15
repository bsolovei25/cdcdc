import { IDatesInterval } from '../../services/widget.service';
import { IMultiChartLine } from './astue-onpz-multi-chart.model';
/// region response start
export interface IAstueOnpzFactoryAnalysisBarResponse {
    sections: IAstueOnpzFactoryAnalysisBarResponseSection[];
    info: string;
    parameters: { id: string; name: string }[];
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
    order: number;
    content: IAstueOnpzFactoryAnalysisBarResponseDiagram[];
}
/// region response end

export interface IAstueOnpzFactoryAnalysis {
    sections: IAstueOnpzFactoryAnalysisSection[];
    selectedPeriod?: IDatesInterval;
    subscriptionOptions?: IAstueOnpzFactoryAnalysisWsOptions;
}

export interface IAstueOnpzFactoryAnalysisDiagram {
    groups: IAstueOnpzFactoryAnalysisGroup[];
    legend: number[];
    minmax: number[];
}

export interface IAstueOnpzFactoryAnalysisWsOptions {
    manufactureName: string;
    unitName: string;
    ovenName?: string;
    manufactureId?: string;
    unitId?: string;
    ovenId?: string;
}

export interface IAstueOnpzFactoryAnalysisSection {
    type: string;
    name: string;
    order: number;
    mainDiagram: { title: string; value: number };
    groups: IAstueOnpzFactoryAnalysisGroup[];
}

export interface IAstueOnpzFactoryAnalysisGroup {
    order: number;
    title: string;
    diagrams: IAstueOnpzFactoryAnalysisBar[];
}

export interface IAstueOnpzFactoryAnalysisBar {
    title: string;
    value: number;
    lowLevel?: number;
    topLevel?: number;
    order?: number;
    type?: IAstueOnpzFactoryAnalysisBarType;
    content?: IAstueOnpzFactoryAnalysisBar[];
}

export enum IAstueOnpzFactoryAnalysisBarType {
    Summary = 'sum',
    Deviation = 'bad',
    Normal = 'norm',
}
