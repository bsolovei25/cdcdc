export interface INumberOfOutagesModel {
    group: string;
    manufactures: IManufacture[];
}

interface IManufacture {
    name: string;
    plants: IPlant[];
}

export interface IPlant {
    name: string,
    unauthorized: number,
    expired: number,
    total: number
}
