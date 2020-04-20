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
    isSearchFilter?: boolean;
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

export interface ITankAttribute {
    paramName?: string;
    paramTitle: string;
    paramValue: string;
    paramUnit?: string;
    paramDateTime?: Date;
    valueStates?: string[];
    isActive?: boolean; // no back
    isEdit?: boolean; // no back
    paramSaveValue?: string; // no back
    paramSaveDateTime?: Date; // no back
}

export interface ITankParam {
    objectName: string;
    objectAttributes: ITankAttribute[];
    objectInfo: ITankInfo;
}

// TODO
export interface ITankInfo {
    asd: string;
    tankTitle: string;
    tankType: string;
    maxValue: number;
    minValue: number;
    dieValue: number;
    absolutValue: number;
    currentValue: number;
    objectStatus: string;
}

export interface IFacilityInfoParam {
    id: number;
    title: string;
    isActive?: boolean; // no back
}

export interface ITransferFilter {
    sortFilter: {
        key: string;
        type: string;
        isUp: boolean;
    };
    textFilter: {
        key: string;
        value: string;
    };
}

export type ObjectStatus = 'in' | 'out' | 'repair' | 'hold' | 'inout' | 'work' | 'unknown';

export type ObjectType = 'Unit' | 'Tank';

export type ObjectDirection = 'enter' | 'exit';

export type OperationType = 'Exist' | 'New';

export type TransfersFilter = 'open' | 'all';
