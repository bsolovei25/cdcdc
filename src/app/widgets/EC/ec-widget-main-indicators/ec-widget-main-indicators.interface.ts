export interface IAstueOnpzMainIndicatorsRaw {
    deviationName: string;
    deviationValue: number;
    factName: string;
    factValue: number;
    nextPlanName: string;
    nextPlanValue?: number;
    planName: string;
    planValue: number;
    unitId?: number;
    engUnits: string;
}

export interface IChannel {
    name: string;
    manufactureName: string;
    unitName: string;
    id: string;
}
