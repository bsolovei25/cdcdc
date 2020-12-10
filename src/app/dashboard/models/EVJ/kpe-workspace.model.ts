export interface IKpeWorkspaceParameter {
    id: number;
    name: string;
}
export interface IKpeAllDependentParameters {
    id: number;
    name: string;
    unit: string;
    parentId: string;
}
export interface IKpeDependentParameter {
    name: string;
    dependentParameterId: number;
    numericValue: number;
    createdAt?: Date;
    createdBy?: number;
}
export interface IKpeNotification {
    selectedParameter: IKpeWorkspaceParameter;
    dependentParameters: IKpeDependentParameter[];
    createdAt: Date;
    createdBy: number;
}
