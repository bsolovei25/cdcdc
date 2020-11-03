export interface ICardLineDiagramModel {
    icon?: string;
    num?: number;
    title: string;
    maxValue: number;
    currentValue: number;
    type?: CardLineDiagramType;
}

export type CardLineDiagramType = 'default' | 'number' | 'icon' | 'deviation-icon';
