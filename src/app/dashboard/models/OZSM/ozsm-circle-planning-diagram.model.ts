export interface IOzsmCirclePlanningDiagramResponse {
    summary: IOzsmCirclePlanningDiagramMainResponse;
    supply: IOzsmCirclePlanningDiagramSubResponse;
    blend: IOzsmCirclePlanningDiagramSubResponse;
    pouring: IOzsmCirclePlanningDiagramSubResponse;
    pack: IOzsmCirclePlanningDiagramSubResponse;
    ship: IOzsmCirclePlanningDiagramMainResponse;
}

export interface IOzsmCirclePlanningDiagramMainResponse {
    plan?: number;
    value?: number;
    percent: number;
    compareValue: number;
    deviation: number;
}

export interface IOzsmCirclePlanningDiagramSubResponse {
    value: number;
    deviation: number;
    percent: number;
}

export interface ICircleData {
    name: string;
    value: number;
    deviation: number;
    percentValue: number;
}
