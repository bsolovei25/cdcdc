export interface CircleFactoryDiagram {
    value: number;
    improvement: number;
    deviation: number;
    image: CircleFactoryDiagramImage[];
}

export interface CircleFactoryDiagramImage {
    id: number;
    isCritical: boolean;
}
