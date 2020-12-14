export interface IAstueOnpzTableIndicatorsItem {
    name: string;
    countExceeding: number;
    items: IAstueOnpzTableIndicatorsItemChild[];
}

export interface IAstueOnpzTableIndicatorsItemChild {
    id: string;
    name: string;
    unitsOfMeasure: string;
    fact: number;
    plan: number;
    isExceeding?: boolean;
}
