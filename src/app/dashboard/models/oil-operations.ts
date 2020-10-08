export interface IOilOperations { /// ALL DATA
    tableLeft: IOilOperationTransfer[];
    received: IOilReceived[];
    shipment: IOilShipment[];
    tableRight: IRightOilTable[];
    filter: IOilFilter[];
    filterTanks: IOilFilterTanks[];
}

export enum operationTransferStatus {
    opened= 'opened', // Операция завершена, но к ней еще не привязаны отгрузки.
    closedNoShipment= 'closedNoShipment', // Операция завершена и итоговый дебаланс в пределах норм рассчитанных погрешностей.
    closed= 'closed', // Операция завершена, текущий дебаланс превышает нормы рассчитанных погрешностей, величина отклонения показана в поле Deviation.
    closedWithDebalance= 'closedWithDebalance',
}

export interface IOilOperationTransfer {
    deviation: number;
    endTime: Date;
    mass: number;
    originalId: string;
    product: string;
    published: boolean;
    startTime: Date;
    status: operationTransferStatus;
    tankNumber: string;
    transferNumber: number;
}

export interface ILeftOilTable {
    number: number;
    rR: string;
    product: string;
    passport: number;
    dateFrom: Date; /// Date
    dateTo: Date; /// Date
    mass: number;
    deviation: number;
    status: operationTransferStatus;
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
