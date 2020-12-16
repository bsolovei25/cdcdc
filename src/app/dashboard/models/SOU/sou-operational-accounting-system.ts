export interface ISOUFlowIn {
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
}

export interface ISOUFlowOut {
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
}

export interface ISOUSection {
    name: string;
    flowIn: ISOUFlowIn[];
    flowOut: ISOUFlowOut[];
    objects: ISOUObjects[];
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

export interface ISOUObjects {
    code: number;
    id: string;
    name: string;
    isExceedingConfInterval: boolean;
    related?: string | number[];
    isEnable: boolean;
    type: 'internal' | 'out';
    selected?: boolean;
}

export interface ISOUIdent {
    title: string;
    value: number;
    percentage: number;
}

export interface ISOULosses {
    ident: ISOUIdent[];
    identifiedList: ISOUIdent[];
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

export interface ISOUOperationalAccountingSystem {
    name: string;
    flowIn: ISOUFlowIn[];
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
}
