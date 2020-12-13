export interface ISouEnergeticOptions {
    manufacture: string;
    unit: string;
}

export interface ISouEnergetic {
    engUnits: string;
    elements: ISouEnergeticElement[];
}

export interface ISouEnergeticElement {
    title: string;
    value: number;
    type: SouEnergeticElementType;
}

export type SouEnergeticElementType = 'h2o' | 'energy' | 'fire' | 'energyHeat';
