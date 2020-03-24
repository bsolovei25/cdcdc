export interface IReferenceTypes {
    id?: number;
    createdAt?: Date;
    createdBy?: Date;
    modifiedAt?: Date;
    modifiedBy?: number;
    name: string;
    description?: string;
    referenceColumns?: IReferenceColumns[];
}

export interface IReferenceColumns {
    id: number;
    createdAt: Date;
    createdBy: Date;
    modifiedAt?: Date;
    modifiedBy?: number;
    referenceTypeId: number;
    name: string;
    description?: string;
    columnTypeId: string; /// ВРЕМЕННЫЙ СТРИНГ
    columnName: string; /// В ЧЕМ ОТЛИЧИЕ ОТ name ???
    isRequred: boolean;
    isUnique: boolean;
}

export interface IReferenceColumnsType {
    id: number;
    name: string;
}
