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
    };
    count: number;
}
