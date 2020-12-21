export interface ISouBalance {
    title: string;
    icon: string;
    mass: number;
    percent: number;
    products: ISouBalanceProducts[]
}

export interface ISouBalanceProducts {
    type: string;
    title: string;
    percent: number;
    mass: number;
}