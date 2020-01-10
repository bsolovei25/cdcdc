
export interface RingEnegryIndicatorModel {
    isCritical: boolean;
    iconId: number;
    procent: number;
    value: EnergyValue[];
}

export interface EnergyValue{
    name: string;
    plan: number;
    fact: number;
}