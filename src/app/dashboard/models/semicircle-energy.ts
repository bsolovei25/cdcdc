export interface SemicircleEnergy {
    iconType: number;
    lowerLimit: number;
    upperLimit: number;
    items: Production[];
    title?: string;
    widgetType?: string;
}

export interface Production {
    name: string;
    plan: number;
    fact: number;
}

export interface EnergyCircleDiagram {
    lowerLimit: number;
    upperLimit: number;
    production1: number;
    production2: number;
    production3: number;
    production4: number;
}

export interface CenterCoords {
    xCen: string;
    yCen: string;
}

export interface LimitLine {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}
