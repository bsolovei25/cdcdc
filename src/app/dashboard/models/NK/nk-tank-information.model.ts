export interface ICard {
    id: number;
    isFilling: boolean;
    title: ITitle;
    innage: IInnage;
    temperature: ITemperature;
    volume: IVolume;
}

export interface ITitle {
    name: string;
    type: string;
}

export interface IInnage {
    lowerBorder: number;
    higherBorder: number;
    currentValue: number;
}

export interface IVolume {
    nominal: number;
    freeSpace: number;
    fill: number;
}

export interface ITemperature {
    current: number;
    maximal: number;
}
