export interface IOzsmLineDiagramResponse {
    scenarioID: string;
    supplyData: IOzsmLineDiagramItemResponse[];
    type: IOzsmLineDiagramType;
}

export interface IOzsmLineDiagramItemResponse {
    name: string;
    value: number;
    percent: number;
}

export interface IOZSMLineDiagram {
    id?: string;
    title: string;
    fact: number;
    plan: number;
    percent?: number;
}

export type IOzsmLineDiagramType =
    | 'blendProducts'
    | 'packedProducts'
    | 'componentSupply'
    | 'crudeSupply';
