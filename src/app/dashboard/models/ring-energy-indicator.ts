export interface RingEnegryIndicatorModel {
    isCritical: boolean;
    iconId: number;
    percent: number;
    values: EnergyValue[];
}

export interface EnergyValue {
    name: string;
    plan: number;
    fact: number;
}
