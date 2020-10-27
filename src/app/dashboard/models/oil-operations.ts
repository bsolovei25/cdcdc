export interface IOilOperations { /// ALL DATA
    tableLeft: IOilOperationTransfer[];
    received: IOilReceived[];
    shipment: IOilShipment[];
    tableRight: IRightOilTable[];
    filter: IOilFilter[];
    filterTanks: IOilFilterTanks[];
}

export enum operationTransferStatus {
    opened= 'opened',
    closedNoShipment= 'closedNoShipment',
    closed= 'closed',
    closedWithDebalance= 'closedWithDebalance',
}

export const operationTransferStatusNameMap: {[key: string]: string} = {
    [operationTransferStatus.opened]: 'Операция не завершена',
    [operationTransferStatus.closedNoShipment]: 'Операция завершена, отгрузки не привязаны',
    [operationTransferStatus.closed]: 'Операция завершена, дебаланс в пределах норм рассчитанных погрешностей',
    [operationTransferStatus.closedWithDebalance]: 'Операция завершена, дебаланс превышает нормы рассчитанных погрешностей. Величина указана в поле Отклонение',
};

export interface IOilOperationTransfer {
    id: number;
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
