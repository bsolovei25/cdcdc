export interface IOilOperations { /// ALL DATA
    tableLeft: IOilTransfer[]; // operation
    received: IOilRowActions[];
    shipment: IOilRowActions[];
    tableRight: IOilShipment[];
    filter: IOilFilter[];
    filterTanks: IOilFilterTanks[];
}

export interface IOilOperationsPassport {
    id: number;
    fileUid: string;
    name: string;
    date: Date;
    tank?: IOilOperationsTank;
}

export interface IOilOperationsProduct {
    id: number;
    sapCode: number;
    name: string;
    gost: string;
    okpd2Code: string;
    isActual?: boolean;
}

export interface IOilOperationsTank {
    enabled?: boolean;
    id: string;
    limitHours?: number;
    name: string;
    shortName: string;
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

export interface IOilTransfer {
    id: number;
    deviation: number;
    endTime: Date;
    mass: number;
    originalId: string;
    product: IOilOperationsProduct;
    published: boolean;
    startTime: Date;
    status: operationTransferStatus;
    tank: IOilOperationsTank;
    transferNumber: number;
    passport?: IOilOperationsPassport;
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

export interface IOilRowActions {
    id: number;
    name: string;
    type: string;
    value?: number;
}

export interface IOilShipment {
    id: number;
    direction: string;
    tankShortName: number;
    documentName: number;
    mass: number;
    passport: number;
    shipped: number;
    note: string;
    shipmentType?: {
        id: number;
        shipmentTypeName: string;
    };
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
