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
