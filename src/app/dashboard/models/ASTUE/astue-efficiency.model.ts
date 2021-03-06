import { IProductionTrend } from '../LCO/production-trends.model';

//#region NEW_MODELS
export interface IAsEfProduct {
    name: string;
    direction: 'in' | 'out';
    units: IAsEfUnitNew[];
    icon?: string;
    id: string;
}

export interface IAsEfTableComponent {
    unitName: string;
    data: IAsEfTable[];
}

export interface IAsEfTable {
    name: string;
    header?: IAsEfRow;
    rows: IAsEfRow[];
    parent?: string;
    engUnits?: string;
    unitName?: string;
}

export interface IAsEfUnitNew extends IAsEfTable {
    id: string;
    flows: IAsEfFlow[];
    currentDeviation: IAsEfLabel;
    currentValue: IAsEfLabel;
    currentPlanFact: IAsEfLabel;
    currentPlanPlan: IAsEfLabel;
    periodDeviations: IAsEfLabel;
    periodCounter: IAsEfLabel;
    periodPlanPlan: IAsEfLabel;
    periodPlanFact: IAsEfLabel;
    engUnits: string;
    initialData: IAsEfRow[];
    planFact: { plan: number; fact: number };
    planPlan: { plan: number; planProcessing: number };
    name: string;
    rows: IAsPlanningRows[];
}

export interface IAsEfFlow extends IAsEfTable {
    id: string;
    engUnits: string;
    astueFlowGraphs: IProductionTrend[];
    initialData: IAsEfTable[];
}

export interface IAsEfLabel {
    value: number;
    status?: LabelStatusType;
    statusName?: string;
}

export type LabelStatusType = 'normal' | 'warning' | 'danger';

export interface IAsEfRow {
    name: string;
    tagName?: string;
    dataSummary?: number;
    values?: IAsEfCell[];
    value?: number;
    uom?: string;
}

export interface IAsEfCell {
    id?: number;
    date: Date;
    value: number;
    isEditable?: boolean;
}

export interface IAsEfGraph {
    higherLimit: number;
    lowerLimit: number;
}

//#endregion

interface IAsEfTempl {
    id?: number;
    name: string;
    uom?: string;
}

export interface IAsEfCard extends IAsEfTempl {
    icon?: string;
    status?: string;
    direction?: string;
}

export interface IAsEfUnitCard extends IAsEfTempl {
    icon?: string;
    status: string;
}

export interface IAsEfUnit extends IAsEfTempl {
    name: string;
    flows: IAsEfUnitCard[];
}

export interface IAsEfInitialDataBlock extends IAsEfTempl {
    value?: number;
    tag?: string;
    rows: IAsEfInitialDataRow[];
}

export interface IAsEfInitialDataRow extends IAsEfTempl {
    value: number;
    tag: string;
    uom?: string;
}

export interface IAsEfTableBlockComponent {
    unitName: string;
    data: IAsEfTableBlock[];
}

export interface IAsEfTableBlock extends IAsEfTempl {
    relativeName?: string;
    status?: string;
    dataSummary?: string;
    data?: IAsEfTableCell[];
    children: IAsEfTableRow[];
    unitName?: string;
}

export interface IAsEfTableRow extends IAsEfTempl {
    dataSummary?: string;
    data: IAsEfCell[];
}

export interface IAsEfTableCell {
    id?: number;
    date: Date;
    value: string;
    isEditable?: boolean;
}

export interface IAsEfScript {
    name: string;
    fromDateTime: Date;
    toDateTime: Date;
}

export interface IAsPlanningTableServer {
    data: {
        groups: IAsPlanningTable[];
        title: string;
    };
}

export interface IAsPlanningTable {
    data: {
        name: string;
        rows: IAsPlanningRows[];
        title: string;
    }[];
    title: '????????????????????' | '????????????????????';
}

export interface IAsPlanningRows {
    id?: string;
    values: {
        editable: boolean;
        date: Date;
        value: number;
    }[];
    name: string;
}
