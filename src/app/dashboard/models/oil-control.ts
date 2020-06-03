export interface OilControls {
    products: OilProducts[];
}

export interface OilProducts {
    name: string;
    value: number;
    criticalValue: number;
    operations: number;
    criticalOperations: number;
    storages: OilStorages[];
}

export interface OilStorages {
    id: number;
    nameStorage: string;
    status: string;
    valueStorage: number;
    tankLevel: number;
    tankers: OilTankers[];
    operations: OilTankOperation[];
}

export interface OilTankOperation {
    timeStart: string;
    timeEnd: string;
    status: string;
    tankValues: OilTankValues[];
}

export interface OilTankValues {
    name: string;
    valueFirst: number;
    valueSecond: number;
    status: string;
    tankDetailType: string;
}

export interface OilTankers {
    nameTanker: string;
    shipped: boolean;
    value: number;
}
