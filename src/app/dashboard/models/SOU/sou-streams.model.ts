export interface ISouOptions {
    manufactures: ISouManufacture[];
    title: string;
    widgetType: string;
}

export interface ISouManufacture {
    id: string;
    name: string;
    units: ISouUnit[];
}

export interface ISouUnit {
    id: string;
    name: string;
    reservoirs: ISouReservoir[];
    balance: 'main' | 'section';
}

export interface ISouReservoir {
    id: string;
    name: string;
}
