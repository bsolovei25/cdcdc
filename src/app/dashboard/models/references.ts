export interface IReferenceTypes {
    id?: number;
    createdAt?: Date;
    createdBy?: Date;
    modifiedAt?: Date;
    modifiedBy?: number;
    name: string;
    description?: string;
    columns?: IReferenceColumns[];
    open?: boolean;
}

export interface IReferenceColumns {
    id?: number;
    createdAt?: Date;
    createdBy?: Date;
    modifiedAt?: Date;
    modifiedBy?: number;
    referenceTypeId: number;
    name: string;
    description?: string;
    columnTypeId: number; /// ВРЕМЕННЫЙ СТРИНГ
    columnName?: string; /// В ЧЕМ ОТЛИЧИЕ ОТ name ???
    isRequred: boolean;
    columnOrder?: number;
    isUnique: boolean;
    open?: boolean;
}

export interface IReferenceData {
    data: IReferenceDataColumns[];
    messages: string;
}

export interface IReferenceDataColumns {
    columnsData?: any[];
    createdAt?: Date;
    createdBy?: Date;
    createdById?: number;
    id?: number;
    modifiedAt?: Date;
    modifiedBy?: Date;
    modifiedById?: number;
    name: string;
    referenceTypeId: number;
}

export interface IReferenceColumnsType {
    id: number;
    name: string;
}
