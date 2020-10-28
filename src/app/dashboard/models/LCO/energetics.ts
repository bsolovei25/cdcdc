export interface IEnergeticsCard {
    plan: number;
    curValue: number;
    deviation1: number;
    deviation2: number;
}

export interface IEnergeticsCircleDiagram {
    lowerLimit: number;
    upperLimit: number;
    termo: number;
    electro: number;
    fuel: number;
}

export interface IEnergeticsGraph {
    plan: number;
    lowerBorder: number;
    higherBorder: number;
    curValue: number;
    maxValue: number;
    lowerValue?: number;
    higherValue?: number;
}

export interface IEnergeticsEndsLine {
    xCen: string;
    yCen: string;
}

export interface IEnergeticsCoordinates {
    x: string;
    y: string;
}

export interface IEnergeticsLimits {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}
