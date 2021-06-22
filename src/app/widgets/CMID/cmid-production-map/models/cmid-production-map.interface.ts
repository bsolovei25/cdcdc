export interface ICmidMnpzProductionMapInterface {
    elements: ICmidMnpzProductionMapInterfaceBuild[];
    weather: ICmidMnpzProductionMapInterfaceWeather;
}

export interface ICmidMnpzProductionMapInterfaceBuild {
    name: string,
    safety: number,
    reliability: number,
    ecology: number
}

export interface ICmidMnpzProductionMapInterfaceWeather {
    precipitation: number,
    windSpeed: number,
    windDirection: number,
    temperature: number,
    pressure: number
}

export enum MapTypes {
    MNPZ_MAP = 'cmid-mnpz-production-map',
    ONPZ_MAP = 'cmid-onpz-production-map',
}
