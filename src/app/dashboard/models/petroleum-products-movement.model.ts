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


