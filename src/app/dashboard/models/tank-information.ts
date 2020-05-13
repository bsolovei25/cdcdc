export interface ITankInformation {
    id: number;
    name: string;
    tank: ITankCard[];
    type: string;
}

export class ITankInformationRef {
    public id: number;
    public name: string;
    public tank: ITankCard[];
    public type: string;

    constructor(data: ITankInformation) {
        Object.assign<ITankInformationRef, ITankInformation, Partial<ITankInformationRef>>(this, data, {});
    }
}

export interface ITankCard {
    id: number;
    name: string;
    values: ITankCardValue;
}

export class ITankCardRef {
    public id: number;
    public name: string;
    public values: ITankCardValue;

    constructor(data: ITankCard) {
        Object.assign<ITankCardRef, ITankCard, Partial<ITankCardRef>>(this, data, {});
    }
}

export interface ITankCardValue {
    displayName: string;
    stateTank: string;
    temp: string;
    maximumVolume: string;
    measuredVolume: string;
    passportState: string;
}

export class ITankCardValueRef {
    public displayName: string;
    public stateTank: string;
    public temp: string;
    public maximumVolume: string;
    public measuredVolume: string;
    public passportState: string;

    constructor(data: ITankCardValue) {
        Object.assign<ITankCardValueRef, ITankCardValue, Partial<ITankCardValueRef>>(this, data, {});
    }
}

export const ITankValueDtoFn = (data: any): any => {
    return new ITankCardValueRef({
        displayName: data['AI_DisplayName'],
        stateTank: data['Состояние резервуара'],
        temp: data['Температура'],
        maximumVolume: data.MaximumVolume,
        measuredVolume: data.MeasuredVolume,
        passportState: data.PassportState,
    });
};

export const ITankCardDtoFn = (data: any): ITankCardRef => {
    return new ITankCardRef({
        id: data.id,
        name: data.name,
        values: data.values ? ITankValueDtoFn(data.values) : null,
    });
};

export const ITankInformationDtoFn = (data: any): ITankInformationRef => {
    return new ITankInformationRef({
        id: data.id,
        name: data.name,
        tank: data.tank ? data.tank.map(el => ITankCardDtoFn(el)) : null,
        type: data.type,
    });
};

export interface ITankFilter {
    type: string;
    open?: boolean;
    tanks: ITankFilterTanks[];
}

export interface ITankFilterTanks {
    name: string;
    active?: boolean;
}

export interface ITankResaultFilter {
    dataFilter: ITankFilter[];
    filter: boolean;
    close: boolean;
}