export interface ITankInformation {
    id: number;
    name: string;
    tank: ITankCard[];
}

export interface ITankCard {
    id: number;
    name: string;
    valuePas: number;
    valueGr: number;
    valueLev: number;
    tankFilling: number;
    status: string;
    operation: string;
}

export interface ITankFilter {
    id: number;
    name: string;
    tank: ITankFilterTanks[];
}

export interface ITankFilterTanks {
    id: number;
    name: string;
    isActive?: boolean;
    open?: boolean;
}