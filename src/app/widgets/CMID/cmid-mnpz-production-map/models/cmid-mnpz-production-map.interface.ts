export interface ICmidMnpzProductionMapInterface {
    builds: ICmidMnpzProductionMapInterfaceBuild[];
    weather: ICmidMnpzProductionMapInterfaceWeather;
}

export interface ICmidMnpzProductionMapInterfaceBuild {
    id: number,
    name: string,
    options: ICmidMnpzProductionMapInterfaceOptions;
}

export interface ICmidMnpzProductionMapInterfaceOptions {
    safety: string,
    reliability: string,
    ecology: string
}

export interface ICmidMnpzProductionMapInterfaceWeather {
    precipitation: number,
    temperature: number,
    pressure: number,
    wind: number,
    windDirection: string
}

export type MapTypes = 'mnpz' | 'onpz';
