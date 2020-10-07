export interface IOilOperations { /// ALL DATA
    tableLeft: ILeftOilTable[];
    received: IOilReceived[];
    shipment: IOilShipment[];
    tableRight: IRightOilTable[];
    filter: IOilFilter[];
    filterTanks: IOilFilterTanks[];
}

export interface ILeftOilTable {
    id: number;
    number: number;
    rR: number;
    product: string;
    passport: number;
    dateFrom: Date; /// Date
    dateTo: Date; /// Date
    mass: number;
    deviation: number;
    status: string;
}

export interface IOilReceived {
    id: number;
    name: string;
    type: string;
}

export interface IOilShipment {
    id: number;
    name: string;
    value?: number;
    type: string;
}

export interface IRightOilTable {
    id: number;
    direction: string;
    rRRiser: number;
    dok: number;
    mass: number;
    pasport: number;
    shipment: number;
    note: string;
}

export interface IOilFilter {
    id: number;
    name: string;
    createdAt?: string;
    isActual?: boolean;
}

export interface IOilFilterTanks {
    id: number;
    name: string;
    valuesTank: IOilValuesTank[];
    open?: boolean;
}

export interface IOilValuesTank {
    id: number;
    number: number;
    work: boolean;
    limit: number;
    valueCap: number;
}
