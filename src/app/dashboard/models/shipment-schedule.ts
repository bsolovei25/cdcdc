export interface IShipment {
    planPercent: number;
    factPercent: number;
    fio: string;
    date: string;
    status: string;
    loadingPercent: number;
    levelServicePercent: number;
    violationValue: number;
    method: IShipmentMethod[];
}

export interface IShipmentMethod {
    label: string;
    value: number;
    date: string;
}
