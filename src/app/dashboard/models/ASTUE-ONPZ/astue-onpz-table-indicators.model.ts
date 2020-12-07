export interface IAstueOnpzTableIndicatorsItem {
    name: string;
    countExceeding: number;
    items: IAstueOnpzTableIndicatorsItemChild[];
}

export interface IAstueOnpzTableIndicatorsItemChild {
    name: string;
    unitsOfMeasure: string;
    fact: number;
    plan: number;
    isExceeding?: boolean;
}
