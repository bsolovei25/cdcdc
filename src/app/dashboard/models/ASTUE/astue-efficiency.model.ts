export interface IAsEfCard {
    name: string;
    icon?: string;
    status?: string;
}

export interface IAsEfUnit {
    name: string;
    streams: IAsEfCard[];
}
