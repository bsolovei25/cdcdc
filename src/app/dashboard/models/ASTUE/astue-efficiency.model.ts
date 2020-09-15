import { IProductionTrend } from '../production-trends.model';

//#region NEW_MODELS
export interface IAsEfProduct {
    name: string;
    direction: 'in' | 'out';
    units: IAsEfUnitNew[];
    icon?: string;
}

export interface IAsEfTable {
    name: string;
    header?: IAsEfRow;
    rows: IAsEfRow[];
    parent?: string;
}

export interface IAsEfUnitNew extends IAsEfTable {
    flows: IAsEfFlow[];
}

export interface IAsEfFlow extends IAsEfTable {
    engUnits: string;
    astueFlowGraphs: IProductionTrend[];
    currentDeviation: IAsEfLabel;
    currentValue: IAsEfLabel;
    currentPlanFact: IAsEfLabel;
    currentPlanPlan: IAsEfLabel;
    periodDeviations: IAsEfLabel;
    periodCounter: IAsEfLabel;
    periodPlanPlan: IAsEfLabel;
    periodPlanFact: IAsEfLabel;
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
    status?: string;
    data: IAsEfInitialDataRow[];
}

export interface IAsEfInitialDataRow extends IAsEfTempl {
    value: number;
}

export interface IAsEfTableBlock extends IAsEfTempl {
    relativeName?: string;
    status?: string;
    dataSummary?: string;
    data?: IAsEfTableCell[];
    children: IAsEfTableRow[];
}

export interface IAsEfTableRow extends IAsEfTempl {
    dataSummary?: string;
    data: IAsEfTableCell[];
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
