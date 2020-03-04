export interface IOperation {
    id: number; // maybe GUID
    source: string;
    receiver: string;
    productSource: string;
    productReceiver: string;
    startOperation: {
        datetime: Date;
        operator: string;
    };
    finishOperation: {
        datetime: Date;
        operator: string;
    };
    massSource: number;
    massReceiver: number;
    deviation: number;
    isOpen: boolean;
    isActive?: boolean;
}

export interface IFacilityInfo {
    parameters: IFacilityInfoParam[];
}

export interface ITankInfo {
    parameters: ITankInfoParam[];
}

export interface ITankInfoParam {
    title: string;
    value: string;
    unit: string;
    priority?: number;
}

export interface IFacilityInfoParam {
    id: number;
    title: string;
    isActive?: boolean;
}


