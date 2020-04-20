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
