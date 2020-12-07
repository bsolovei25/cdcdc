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
    isDeviation?: boolean;
}

// countExceeding: 0
// items: Array(2)
// 0:
// fact: 123.45
// isExceeding: false
// name: "Коэффициент избытка воздуха"
// plan: 123.45
// unitsOfMeasure: "ед. изм."
// __proto__: Object
// 1: {name: "Температура воздуха на горение в печи", unitsOfMeasure: "ед. изм.", plan: 123.45, fact: 123.45, isExceeding: false}
// length: 2
// __proto__: Array(0)
// name: "Воздух"
