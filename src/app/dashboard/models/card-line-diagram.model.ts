export interface ICardLineDiagramModel {
    icon?: number;
    title: string;
    maxValue: number;
    currentValue: number;
    type?: CardLineDiagramType;
}

export type CardLineDiagramType = 'default' | 'number' | 'railway' | 'auto';
