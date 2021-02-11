export interface IOilOperations {
    /// ALL DATA
    tableLeft: IOilTransfer[]; // operation
    received: IOilRowActions[];
    shipment: IOilRowActions[];
    tableRight: IOilShipment[];
    filter: IOilFilter[];
}

export interface IOilOperationsPassport {
    id: number;
    fileUid: string;
    name: string;
    date: Date;
    armName?: string;
    createdBy?: number;
    tank?: IOilOperationsTank;
}

export interface IOilOperationsProduct {
    id: number;
    sapCode: number;
    name: string;
    gost: string;
    okpd2Code: string;
    isActual?: boolean;
    group?: {
        id: number;
        name: string;
    };
}

export interface IOilOperationsTank {
    enabled?: boolean;
    capacity?: number;
    id: string;
    limitHours?: number;
    name: string;
    shortName: string;
    group?: {
        id: number;
        name: string;
    };
}

export enum operationTransferStatus {
    opened = 'opened',
    closedNoShipment = 'closedNoShipment',
    closed = 'closed',
    closedWithDebalance = 'closedWithDebalance',
}

export const operationTransferStatusNameMap: { [key: string]: string } = {
    [operationTransferStatus.opened]: 'Операция не завершена',
    [operationTransferStatus.closedNoShipment]: 'Операция завершена, отгрузки не привязаны',
    [operationTransferStatus.closed]: 'Операция завершена, дебаланс в пределах норм рассчитанных погрешностей',
    [operationTransferStatus.closedWithDebalance]:
        'Операция завершена, дебаланс превышает нормы рассчитанных погрешностей. Величина указана в поле Отклонение',
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
    mass: number;
    passport?: IOilOperationsPassport;
    product?: IOilOperationsProduct;
    tank?: IOilOperationsTank;
    dateFinish?: Date;
    shipped: number;
    note: string;
    shipmentType?: {
        id: number;
        shipmentTypeName: string;
    };
    shippingComplex?: {
        id: number;
        name: string;
    };
    transferPrevId?: number;
}

export type OilOperationsShipmentType = 'manual' | 'pipeline' | 'railway' | 'tankLoad' | 'tankTruck' | 'work' | 'all';

export interface IOilShipmentStatistics {
    quantity: number;
    weight: number;
    transportTypeStatistics: {
        type: OilOperationsShipmentType;
        quantity: number;
        weight: number;
    }[];
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
    quantity: number;
    data: IOilOperationsTank[];
}
