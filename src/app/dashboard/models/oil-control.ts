export interface OilControls {
    operations: number;
    criticalOperations: number;
    products: OilProducts[];
}

export interface OilProducts {
    name: string;
    value: number;
    critical: number;
    storages: OilStorages[];
}

export interface OilStorages {
    id: number;
    nameStorage: string;
    status: string;
    valueStorage: number;
    tank: OilTank;
    tankers: OilTankers[];
}

export interface OilTank {
    timeStart: string;
    timeEnd: string;
    tankLevel: number;
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
