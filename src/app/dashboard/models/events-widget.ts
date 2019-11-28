export interface EventsWidgetNotification {
  id?: number;
  itemNumber: number;
  organization: string;
  branch: string;
  place: { id: number, name: string };
  responsibleOperator: User;
  fixedBy: User;
  eventDateTime: Date;
  iconUrl: string;
  iconUrlStatus: string;
  status: { id: number, name: EventsWidgetNotificationStatus, code: string };
  priority: { id: number, name: EventsWidgetNotificationPriority, code: string };
  deviationReason: string; // Причина отклонения
  establishedFacts: string; // Установленные факты
  eventType: string; // Тип происшествия
  directReasons: string; // Непосредственные/прямые причины
  description: string; // Описание
  comment: string; // Комментарий оператора
  category: { id: number, name: EventsWidgetCategoryCode, code: string };
  statusName?: string;
  severity: string;
  retrievalEvents: RetrievalEvents[];
  equipmentCategory: { id: number, name: string, code: string };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type EventsWidgetNotificationPriority = 'danger' | 'warning' | 'standard'

export type EventsWidgetNotificationStatus = 'new' | 'inWork' | 'closed'

export type EventsWidgetFilterCode = 'all' | 'inWork' | 'closed'

export type EventsWidgetCategoryCode = 'smotr' | 'safety' | 'tasks' | 'equipmentStatus' | 'drops'

export interface RetrievalEvents {
  deadline: Date,
  description: string,
  id?: number,
  responsibleUser: User | null,
  status: { id: number, name: EventsWidgetNotificationStatus, code: string },
  isNew: boolean
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
}

export interface EventsWidgetNotificationsCounter {
  closed: number;
  all: number;
}

export interface EventsWidgetData {
  notifications: EventsWidgetNotification[];
  categories: EventsWidgetCategory[];
  filters: EventsWidgetFilter[];
}


export interface EventsWidgetOptions {
  categories: EventsWidgetCategoryCode[];
  filter: EventsWidgetFilterCode;
}
