export interface IDailyPlanProduct {
    upperGraph: IDPPUpperCol;
    downerGraph: IDPPDownerCol;
    isActive: boolean;
    isWarning: boolean;
    date: Date;
}

export interface IDPPUpperCol {
    higherValue: number;
    lowerValue: number;
    currentValue: number;
    maxValue: number;
}

export interface IDPPDownerCol {
    currentValue: number;
    plan: number;
    maxValue: number;
}

export interface IPeriod {
    begin: Date;
    end: Date;
    sumResult: number;
    isActivePeriod: boolean;
}
