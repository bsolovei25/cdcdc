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
    operationType?: OperationType;
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
    parameters?: ITankAttribute[];
    isActive?: boolean; // no back
}

export interface ITankAttribute {
    title: string;
    value: string;
    unit: string;
    priority?: number; // no back
    active?: boolean; // no back
}

export interface ITankParam {
    objectName: string;
    objectAttributes: ITankAttribute[];
    objectInfo: ITankInfo;
}

// TODO
export interface ITankInfo {
    asd: string;
}

export interface IFacilityInfoParam {
    id: number;
    title: string;
    isActive?: boolean; // no back
}

export type ObjectStatus = 'in' | 'out' | 'repair' | 'hold' | 'inout' | 'work' | 'unknown';

export type ObjectType = 'Unit' | 'Tank';

export type ObjectDirection = 'enter' | 'exit';

export type OperationType = 'Exist' | 'New';
