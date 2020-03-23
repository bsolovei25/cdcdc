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
    name: string;
    type: ObjectType;
    status: ObjectStatus;
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
export type ObjectStatus = 'vverh-arrow' | 'Remont' | 'Otstoy' | 'two-arrow' | 'vniz-arrow';

export type ObjectType = 'unit' | 'tank';

export type ObjectDirection = 'enter' | 'exit';
