export interface IAsEfCard {
    name: string;
    icon?: string;
    status?: string;
}

export interface IAsEfUnit {
    name: string;
    streams: IAsEfCard[];
}

export interface IAsEfInitialDataBlock {
    name: string;
    value?: number;
    status?: string;
    data: IAsEfInitialDataRow[];
}

export interface IAsEfInitialDataRow {
    name: string;
    value: number;
}

export interface IAsEfTableBlock {
    name: string;
    status?: string;
    dataSummary?: string;
    data?: IAsEfTableCell[];
    children: IAsEfTableRow[];
}

export interface IAsEfTableRow {
    name: string;
    dataSummary?: string;
    data: IAsEfTableCell[];
}

export interface IAsEfTableCell {
    date: Date;
    value: string;
    isEditable?: boolean;
}
