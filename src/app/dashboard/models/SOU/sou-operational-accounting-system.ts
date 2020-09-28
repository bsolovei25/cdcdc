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
    valueMomentPercent: number;
    valueByHourPercent: number;
    valueTankPercent: number;
    isExceedingConfInterval: boolean;
    accuracy: number;
}

export interface ISOUFlowOut {
    dscFlow: {
        isEnable: boolean,
        name: string
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
    ident: ISOUIdent[];
    lossesType: {
        name: string;
        persent: number;
        value: number;
        isButton?: boolean;  // only front
    }[];
}

export interface ISOUProduct {
    productName: string;
    day: number;
    dayPercent: number;
    hour: number;
    hourPercent: number;
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
