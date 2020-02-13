import { LineChartData } from './line-chart';

// id: 32953
// originalId: "32ce124d-ff84-4ec0-ba66-8a4b56e9f55e"
// itemNumber: 2
// place: {id: 5001, name: "ГФУ-1"}
// eventDateTime: "2020-02-11T10:35:36.159"
// status: {id: 3001, name: "new", code: "0"}
// priority: {id: 2001, name: "danger", code: "0", sortOrder: 1}
// category: {id: 1001, name: "smotr", code: "0"}
// severity: "critical"
// description: ""
// comment: "Новое событие"
// sortIndex: 0

export interface EventsWidgetNotificationPreview {
    id: number;
    originalId: string;
    itemNumber: number;
    place: { id: number; name: string };
    eventDateTime: Date;
    status: IStatus;
    priority: IPriority;
    category: ICategory;
    severity: string;
    description: string;
    comment: string;
    sortIndex: number;
}

export interface EventsWidgetNotification {
    id?: number;
    itemNumber: number;
    organization: string;
    branch: string;
    place: { id: number; name: string };
    responsibleOperator: IUser;
    fixedBy: IUser;
    eventDateTime: Date;
    iconUrl?: string;
    iconUrlStatus?: string;
    status: IStatus;
    priority: IPriority;
    deviationReason: string; // Причина отклонения
    establishedFacts: string; // Установленные факты
    eventType: { id: number; name: string }; // Тип происшествия
    directReasons: string; // Непосредственные/прямые причины
    description: string; // Описание
    comment: string; // Комментарий оператора
    category: ICategory;
    statusName?: string;
    severity: string;
    retrievalEvents: EventsWidgetNotification[];
    equipmentCategory: { id: number; name: string; code: string };
    deadline?: Date;
    graphValues: LineChartData;
    source?: any;
}

export interface IUser {
    login: string;
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email?: string;
    phone?: string;
    brigade?: { id: number; number: string };
    positionDescription?: string;
}

export type EventsWidgetNotificationPriority = 'danger' | 'warning' | 'standard';

export type EventsWidgetNotificationStatus = 'new' | 'inWork' | 'closed';

export type EventsWidgetFilterCode = 'all' | 'inWork' | 'closed';

export type EventsWidgetCategoryCode = 'smotr' | 'safety' | 'tasks' | 'equipmentStatus' | 'drops';

export interface ICategory {
    id: number;
    name: EventsWidgetCategoryCode;
    code: string;
}

export interface IStatus {
    id: number;
    name: EventsWidgetNotificationStatus;
    code: string;
}

export interface IPriority {
    id: number;
    name: EventsWidgetNotificationPriority;
    code: string;
}

export interface EventsWidgetFilter {
    id: number;
    code: EventsWidgetFilterCode;
    notificationsCount: number;

    name?: string;
    isActive?: boolean;
}

export interface EventsWidgetCategory {
    id: number;
    code: EventsWidgetCategoryCode;
    notificationsCounts: EventsWidgetNotificationsCounter;

    iconUrl?: string;
    name?: string;
    isActive?: boolean;
    url?: string;
}

export interface EventsWidgetNotificationsCounter {
    open: number;
    all: number;
}

export interface EventsWidgetData {
    notifications: EventsWidgetNotification[];
}

export interface EventsWidgetOptions {
    categories: number[];
    filter: EventsWidgetFilterCode;
}

export interface EventsWidgetsStats {
    statsByCategory: EventsWidgetsStatsCategory[];
    statsByStatus: EventsWidgetsStatsStatus[];
}

export interface EventsWidgetsStatsCategory {
    category: { id: number };
    unclosedCount: number;
    totalCount: number;
}

export interface EventsWidgetsStatsStatus {
    status: { id: number };
    count: number;
}
