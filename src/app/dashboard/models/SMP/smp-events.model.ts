export interface ISmpEvent {
    id: number;
    originalId: string;
    date: string;
    company: string;
    state: string;
    description: string;
    reasons: ISmpEventReason[];
    actions: ISmpEventActions[];
}

export interface ISmpEventReason {
    comment: string;
    createdAt: string;
    createdBy: number;
    displayName: string;
    active: boolean;
}

export interface ISmpEventActions {
    comment: string;
    createdAt: string;
    createdBy: number;
    displayName: string;
    active: boolean;
}

export interface ISmpEventCard {
    id: number;
    originalId: string;
    itemNumber: number;
    cardDate: string;
    statusName: string;
    productName?: string;
    severity: string;
    description: string;
    day?: number;
    responsibleOperator: ISmpResponsibleOperator;
}

export interface ISmpResponsibleOperator {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    middleName: string;
    displayName: string;
}

export interface ISmpEventStatusStatistics {
    statsByStatus: ISmpEventStatus[];
}

export interface ISmpEventStatus {
    status: {
        id: number;
        name: string;
        code: string;
        description?: string;
    };
    count: number;
}
