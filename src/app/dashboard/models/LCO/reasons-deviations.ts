export interface IReasonsDeviationsInfo {
    timeFrom: string;
    timeTo: string;
    shipped: IReasonsDeviationsInfoValue;
    dataShipped: IReasonsDeviationsInfoValue;
    unbalance: IReasonsDeviationsInfoValue;
    allowUnbalance: IReasonsDeviationsInfoValue;
    deviation: IReasonsDeviationsInfoValue;
}

export interface IReasonsDeviationsInfoValue {
    value: number;
    percent: number;
}

export interface IReasonsTankers {
    id: number;
    type: string;
    value: string;
}

export interface IReasonsTankerCard {
    name: string;
    percent: number;
    shipped: number;
    capacity: number;
    valueLevel: number;
    type: string;
}
