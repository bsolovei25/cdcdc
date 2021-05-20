import { ISouIdent } from '@dashboard/models/SOU/sou-operational-accounting-system.model';

export interface ISouMainIndicators {
    reductionSpeed?: ISouMainIndicatorsSpeed;
    reductionQuality?: ISouMainIndicatorsQuality;
    formationSpeed?: ISouMainIndicatorsSpeed;
    errorsOperations?: ISouMainIndicatorsErrors;
    errorsRude?: ISouMainIndicatorsErrors;
    losses?: ISouMainIndicatorsLosses;
}

export interface ISouMainIndicatorsBlock {
    title: string;
    units: string;
}

export interface ISouMainIndicatorsSpeed extends ISouMainIndicatorsBlock {
    elements: ISouMainIndicatorsDateCard[];
    diagram: ISouMainIndicatorsDiagram;
}

export interface ISouMainIndicatorsQuality extends ISouMainIndicatorsBlock {
    elements: ISouMainIndicatorsDateCard[];
    value: number;
}

export interface ISouMainIndicatorsErrors extends ISouMainIndicatorsBlock {
    value: number;
    maxValue?: number;
}

export interface ISouMainIndicatorsLosses extends ISouMainIndicatorsBlock {
    sum: ISouMainIndicatorsLossesCard;
    identified: ISouMainIndicatorsLossesCard;
    unidentified: ISouMainIndicatorsLossesCard;
    identifiedList: ISouIdent[];
}

export interface ISouMainIndicatorsLossesCard {
    value: number;
    percentage: number;
}

export interface ISouMainIndicatorsDateCard {
    value: number;
    date: Date;
}

export interface ISouMainIndicatorsDiagram {
    fact: number;
    plan: number;
}
