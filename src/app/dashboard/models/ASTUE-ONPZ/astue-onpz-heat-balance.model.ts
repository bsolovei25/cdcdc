export interface IAstueOnpzHeatBalanceItem {
    id: string;
    name: string;
    description: string;
    relativeValue: number;
    absoluteValue: number;
    items?: IAstueOnpzHeatBalanceItem[];
    typeData: AstueHeatBalanceDataType;
}

export type AstueHeatBalanceDataType = 'oven' | 'section';
