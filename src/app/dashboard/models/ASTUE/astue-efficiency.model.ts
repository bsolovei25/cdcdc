//#region NEW_MODELS
export interface IAsEfProduct {
    name: string;
    direction: 'in' | 'out';
    units: IAsEfUnit[];
    icon?: string;
}

export interface IAsEfUnitNew {
    name: string;
    rows: IAsEfRow[];
    flows: IAsEfFlow[];
}

export interface IAsEfFlow {
    name: string;
    rows: IAsEfRow[];
    astueFlowGraph: IAsEfGraph;
}

export interface IAsEfRow {
    [key: string]: IAsEfCell[];
}

export interface IAsEfCell {
    id?: number;
    date: Date;
    value: number;
    isEditable?: boolean;
}

export interface IAsEfGraph {
    currentDeviation: number;
    currentValue: number;
    higherLimit: number;
    lowerLimit: number;
    periodDeviation: number;
    periodSum: number;
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
