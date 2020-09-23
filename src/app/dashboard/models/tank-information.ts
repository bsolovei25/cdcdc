export interface ITankInformation {
    id: number;
    name: string;
    tank: ITankCardValue[];
    type: string;
}

export class ITankInformationRef {
    public id: number;
    public name: string;
    public tank: ITankCardValue[];
    public type: string;

    constructor(data: ITankInformation) {
        Object.assign<ITankInformationRef,
        ITankInformation,
        Partial<ITankInformationRef>>(this, data, {});
    }
}

export interface ITankCardValue {
    absolutValue: number;
    currentValue: number;
    maxTemperature: number;
    maxValue: number;
    minValue: number;
    objectStatus: string;
    passportState: string;
    roofType: string;
    isPassportized: boolean;
    tankTitle: string;
    tankType: string;
    nominalValue: number;
    fillLevelPercentage: number;
    measuredVolume: number;
    temperature: number;
    dieValue: number;
    resourceForShipment: number;
    freeSpace: number;
    attributes: ICardAttributes[];
}

export interface ICardAttributes {
    value: string;
    unit: string;
    description: string;
}

export class ITankCardValueRef {
    public absolutValue: number;
    public currentValue: number;
    public maxTemperature: number;
    public dieValue: number;
    public maxValue: number;
    public measuredVolume: number;
    public nominalValue: number;
    public minValue: number;
    public objectStatus: string;
    public passportState: string;
    public roofType: string;
    public isPassportized: boolean;
    public tankTitle: string;
    public tankType: string;
    public temperature: number;
    public fillLevelPercentage: number;
    public resourceForShipment: number;
    public freeSpace: number;
    public attributes: ICardAttributes[];

    constructor(data: ITankCardValue) {
        // if (data.measuredVolume > data.maxValue)
        Object.assign<ITankCardValueRef,
        ITankCardValue,
        Partial<ITankCardValueRef>>(this, data, {});
    }
}

export const ITankValueDtoFn = (data: any): any => {
    return new ITankCardValueRef({
        absolutValue: data.absolutValue,
        currentValue: data.currentValue,
        maxTemperature: data.maxTemperature,
        dieValue: data.dieValue,
        maxValue: data.maxValue,
        measuredVolume: data.measuredVolume,
        minValue: data.minValue,
        objectStatus: data.objectStatus,
        passportState: data.passportState,
        roofType: data.roofType,
        isPassportized: data.isPassportized,
        tankTitle: data.tankTitle,
        tankType: data.tankType,
        nominalValue: data.nominalValue,
        fillLevelPercentage: data.fillLevelPercentage,
        resourceForShipment: data.resourceForShipment,
        freeSpace: data.freeSpace,
        temperature: data.temperature,
        attributes: data.attributes,
    });
};

export const ITankInformationDtoFn = (data: any): ITankInformationRef => {
    return new ITankInformationRef({
        id: data.id,
        name: data.name,
        tank: data.tank ? data.tank.map(el => ITankValueDtoFn(el)) : null,
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
