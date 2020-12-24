export interface IOzsmScenarioResponse {
    scenarioId: string;
    planName: string;
    dateGraph: Date;
    planPeriod: Date;
    agreementStatus: OzsmScenarioAgreementStatus;
}

export interface IOzsmScenario {
    scenarioId: string;
    name: string;
    status: number;
}

export type OzsmScenarioAgreementStatus =
    | 'notSubmittedForReconciliation' // Не передан на согласование
    | 'underReconciliation' // На согласовании
    | 'underApproval' // На утверждении
    | 'published'; // Опубликован
