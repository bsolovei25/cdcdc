export interface ITransfer {
    uid?: string;
    sourceName: string;
    destinationName: string;
    sourceProduct: string;
    destinationProduct: string;
    startTime: Date;
    endTime: Date;
    sourceMass: number;
    destinationMass: number;
    sourceClient: string;
    destinationClient: string;
    deltaMass: number;
    isActive?: boolean;
}

export interface IPetroleumObject {
    objectName: string;
    objectType: ObjectType;
    objectStatus: ObjectStatus;
    isActive?: boolean;
}

export interface IFacilityInfo {
    id?: number;
    title: string;
    state: ObjectStatus;
    parameters?: IFacilityInfoParam[];
    isActive?: boolean; // no back
}

export interface ITankInfo {
    id?: number;
    title: string;
    state: ObjectStatus;
    parameters?: ITankInfoParam[];
    isActive?: boolean; // no back
}

export interface ITankInfoParam {
    title: string;
    value: string;
    unit: string;
    priority?: number; // no back
}

export interface IFacilityInfoParam {
    id: number;
    title: string;
    isActive?: boolean; // no back
}

// TODO add real list
export type ObjectStatus = 'in' | 'out' | 'repair' | 'hold' | 'inout';

export type ObjectType = 'Unit' | 'Tank';

export type ObjectDirection = 'enter' | 'exit';
