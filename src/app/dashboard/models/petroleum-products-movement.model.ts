export interface ITransfer {
    uid?: string;
    sourceName: string;
    destinationName: string;
    startTime: Date;
    endTime: Date;
    sourceProduct: string;
    destinationProduct: string;
    sourceMass: number;
    destinationMass: number;
    sourceClient: string;
    destinationClient: string;
    deltaMass: number;
    isActive?: boolean;
}

export interface IOperation {
    id?: number; // maybe GUID
    source: string;
    receiver: string;
    productSource: string;
    productReceiver: string;
    startOperation: {
        datetime?: Date;
        operator?: string;
    };
    finishOperation: {
        datetime?: Date;
        operator?: string;
    };
    massSource: number;
    massReceiver: number;
    deviation: number;
    isOpen?: boolean;
    isActive?: boolean; // no back
}

export interface ITransfer {
    guid?: string;
}

export interface IFacilityInfo {
    id?: number;
    title: string;
    state: ObjectState;
    parameters?: IFacilityInfoParam[];
    isActive?: boolean; // no back
}

export interface ITankInfo {
    id?: number;
    title: string;
    state: ObjectState;
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
export type ObjectState = 'vverh-arrow' | 'Remont' | 'Otstoy' | 'two-arrow' | 'vniz-arrow';
