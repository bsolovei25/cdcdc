export interface IAstueOnpzHeatBalanceItem {
    name: string;
    description: string;
    relativeValue: number;
    absoluteValue: number;
    items?: IAstueOnpzHeatBalanceItem[];
}
