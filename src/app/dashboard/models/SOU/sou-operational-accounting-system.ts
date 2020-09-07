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
    valueMomentPercent: number;
    valueByHourPercent: number;
    valueTankPercent: number;
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
    name: string;
    productType: string;
    valueByHour: number;
    valueTank: number;
    percentByHour: number;
    percentTank: number;
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
    deltaByPersent: number;
    balanceAllowByPercent: number;
    notificationCards: ISOUNotificationCards[];
}
