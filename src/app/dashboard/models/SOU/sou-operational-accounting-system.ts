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

    selected?: boolean;
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

    selected?: boolean;
}

export interface ISOUSection {
    name: string;
    flowIn: ISOUFlowIn[];
    flowOut: ISOUFlowOut[];
    objects: ISOUObjects[];
    isEnable?: boolean;
    order: number;
}

export interface ISOUObjects {
    code: number;
    id: string;
    name: string;
    isExceedingConfInterval: boolean;
    isEnable: boolean;
    type: 'internal' | 'out';
    selected?: boolean;
}

export interface ISOUIdent {
    name: string;
    value: number;
}

export interface ISOULosses {
    ident: ISOUIdent[];
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
}
