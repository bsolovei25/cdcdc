import { LineChartData } from './line-chart';

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
    code: EventsWidgetFilterCode;
    notificationsCount: number;

    name?: string;
    isActive?: boolean;
}

export interface EventsWidgetCategory {
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
    categories: EventsWidgetCategoryCode[];
    filter: EventsWidgetFilterCode;
}
