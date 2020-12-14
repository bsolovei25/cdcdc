import { IDatesInterval } from '../../services/widget.service';
import { IMultiChartLine } from './astue-onpz-multi-chart.model';
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
    bars: IAstueOnpzFactoryAnalysisBar[];
}

export interface IAstueOnpzFactoryAnalysisBar {
    title: string;
    value: number;
    lowLevel?: number;
    topLevel?: number;
    order?: number;
    type?: IAstueOnpzFactoryAnalysisBarType;
}

export enum IAstueOnpzFactoryAnalysisBarType {
    Summary = 'sum',
    Deviation = 'bad',
    Normal = 'norm',
}
