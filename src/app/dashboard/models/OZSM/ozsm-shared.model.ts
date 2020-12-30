export interface IOzsmStorageStatsResponse {
    storagePercent: number;
    parkCurrentValue: number;
    parkDeathValue: number;
    storageStats: IOzsmStorageStatsItemResponse[];
}

export interface IOzsmStorageStatsItemResponse {
    name: string;
    value: number;
    deathLevel: number;
    available: number;
    percent: number;
}

export interface IOzsmLoadingPark {
    currentValue: number;
    deathValue: number;
    storages: IOzsmLoadingParkItem[];
}

export interface IOzsmLoadingParkItem {
    name: string;
    value: number;
    deathLevel: number;
    available: number;
    percent: number;
}
