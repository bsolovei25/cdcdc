export interface OilControls {
    operations: number;
    criticalOperations: number;
    products: OilProducts[];
}

export interface OilProducts {
    name: string;
    value: number;
    criticalValue: number;
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
    tankValues: OilTankValues[];
}

export interface OilTankValues {
    name: string;
    valueFirst: number;
    valueSecond: number;
    status: string;
}

export interface OilTankers {
    nameTanker: string;
    shipped: boolean;
    value: number;
    title: string;
}
