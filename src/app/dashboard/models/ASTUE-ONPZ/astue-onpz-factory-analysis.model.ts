import { IDatesInterval } from '../../services/widget.service';
import { IMultiChartLine } from './astue-onpz-multi-chart.model';

export interface IAstueOnpzFactoryAnalysis {
    sections: IAstueOnpzFactoryAnalysisSection[];
    graph: {
      name: string;
      graph: IMultiChartLine[];
    };
    selectedPeriod?: IDatesInterval;
    subscriptionOptions?: IAstueOnpzFactoryAnalysisWsOptions;
}

export interface IAstueOnpzFactoryAnalysisWsOptions {
    ManufactureName: string;
    UnitName: string;
    OvenName?: string;
}

export interface IAstueOnpzFactoryAnalysisSection {
    type: string;
    name: string;
    order: number;
    mainDiagram: { title: string, value: number };
    groups: IAstueOnpzFactoryAnalysisGroup[];
}

export interface IAstueOnpzFactoryAnalysisGroup {
    order: number;
    title: string;
    type: string;
    diagrams: IAstueOnpzFactoryAnalysisBar[];
}

export interface IAstueOnpzFactoryAnalysisBar {
    title: string;
    value: number;
    tags: string[];
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
