export interface ISouOptions {
    manufactures: ISouManufacture[];
}

export interface ISouManufacture {
    id: string;
    name: string;
    units: ISouUnit[];
}

export interface ISouUnit {
    id: string;
    name: string;
    section: ISouSection[];
    balance: 'main' | 'section';
}

export interface ISouSection {
    id: string;
    name: string;
    countFlowExceedingConfInterval?: number;
}

export interface ISouFlowIn {
    code: number;
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
    valueMomentPercent: number;
    valueByHourPercent: number;
    valueTankPercent: number;
    isExceedingConfInterval: boolean;
    accuracy: number;
    order: number;
    related?: string | number[];
    valueEdit?: number;
    selected?: boolean;
    error?: number;
    codeIn?: string;
    codeOut?: string;
    linkId?: string;
}

export interface ISouFlowOut {
    code: number;
    dscFlow: {
        isEnable: boolean;
        name: string;
    }[];
    isExceedingConfInterval: boolean;
    valueByHourPercent: number;
    valueMomentPercent: number;
    valueTankPercent: number;
    productName: string;
    valueMeasuring: number;
    valueCalculate: number;
    valueMoment: number;
    valueByHour: number;
    valueTank: number;
    tolerance: number;
    tag: string;
    isEnable: boolean;
    accuracy: number;
    order: number;
    valueEdit: number;
    error: number;
    related?: string | number[];

    selected?: boolean;
    codeIn?: string;
    codeOut?: string;

    linkId?: string;
}

export interface ISOUSection {
    name: string;
    flowIn: ISouFlowIn[];
    flowOut: ISouFlowOut[];
    objects: ISouObjects[];
    isEnable?: boolean;
    order: number;
    countFlowExceedingConfInterval?: number;
    codeIn: string;
    codeOut: string;
    deltaHour: number;

    deltaHourByPercent: number;
    balanceAllowHour: number;
    balanceAllowHourByPercent: number;
    massIn: number;
    massInDay: number;
    massInDayDev: number;
    massInHour: number;
    massInHourDev: number;
    massOut: number;
    massOutDay: number;
    massOutDayDev: number;
    massOutHour: number;
    massOutHourDev: number;
    value: number;
}

export interface ISouObjects {
    code: number;
    id: string;
    name: string;
    isExceedingConfInterval: boolean;
    related?: string | number[];
    isEnable: boolean;
    type: 'internal' | 'out';
    selected?: boolean;
    value: number;
    linkId?: string;
    tolerance?: number;
}

export interface ISouIdent {
    title: string;
    value: number;
    percentage: number;
    isHighlighted?: boolean;
    className?: string;
}

export interface ISOULosses {
    ident: ISouIdent[];
    identifiedList: ISouIdent[];
    lossesType: {
        name: string;
        persent: number;
        value: number;
        isButton?: boolean; // only front
    }[];
}

export interface ISOUProduct {
    productName: string;
    day: number;
    dayPercent: number;
    hour: number;
    hourPercent: number;
    order: number;
}

export interface ISOUNotificationCards {
    date: Date;
    id: string;
    message: string;
    tag: string;
}

export interface IReferenceBook {
    manufacture: string[];
    unit: string[][];
}

export interface ISOUOperationalAccountingSystem {
    name: string;
    flowIn: ISouFlowIn[];
    sumInByDay: number;
    sumInByHour: number;
    section: ISOUSection[];
    sumOutByDay: number;
    sumOutByHour: number;
    delta: number;
    balanceAllow: number;
    losses: ISOULosses;
    undefinedLosses: number;
    lightProducts: ISOUProduct[];
    title: string;
    widgetType: string;
    deltaByPersent: number;
    balanceAllowByPercent: number;
    notificationCards: ISOUNotificationCards[];
    lampOn: boolean;
    balanceAllowHourByPercent: number;
    balanceAllowHour: number;
    deltaHour: number;
    deltaHourByPercent: number;
    referenceBook: IReferenceBook;
}

export type SouSectionData = ISouFlowOut | ISouFlowIn | ISouObjects;
