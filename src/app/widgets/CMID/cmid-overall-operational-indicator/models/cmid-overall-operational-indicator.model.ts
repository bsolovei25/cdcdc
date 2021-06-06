export interface ICmidMultichartModel {
    id: number;
    label: string;
    color: string;
    graph: ICmidMultichartDataModel[];
    visible?: boolean;
}

export interface ICmidMultichartDataModel {
    value: number;
    timeStamp: string;
}

export interface ICmidMultichartFilterModel {
    id: number;
    label: string;
    visible: boolean;
}
