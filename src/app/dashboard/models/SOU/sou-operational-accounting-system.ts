export interface ISOUFlowIn {
    srcName: string;
    productName: string;
    valueMeasuring: number;
    valueCalculate: number;
    valueMoment: number;
    valueByHour: number;
    valueTank: number;
    tolerance: number;
    tag: string;
    isEnable: boolean;
}

export interface ISOUFlowOut {
    dscName: string[];
    productName: string;
    valueMeasuring: number;
    valueCalculate: number;
    valueMoment: number;
    valueByHour: number;
    valueTank: number;
    tolerance: number;
    tag: string;
    isEnable: boolean;
}

export interface ISOUSection {
    name: string;
    flowOut: ISOUFlowOut[];
    isEnable?: boolean;
}

export interface ISOUIdent {
    name: string;
    value: number;
}

export interface ISOULosses {
    undefinedLosses: number;
    sumLosses: number;
    ident: ISOUIdent[];
    sum: number;
}

export interface ISOUProduct {
    name: string;
    productType: string;
    valueByHour: number;
    valueTank: number;
    percentByHour: number;
    percentTank: number;
}

export interface ISOUOperationalAccountingSystem {
    name: string;
    flowIn: ISOUFlowIn[];
    summIn: number;
    summInByHour: number;
    section: ISOUSection[];
    sumOut: number;
    sumOutByHour: number;
    delta: number;
    balanceAllow: number;
    losses: ISOULosses;
    undefinedLosses: number;
    products: ISOUProduct[];
    title: string;
    widgetType: string;
}
