export interface EventsWidgetNotification {
  id: number;
  serialNumber: number;
  priority: EventsWidgetNotificationPriority;
  dateTime: Date;
  iconUrl: string;
  statusCode: EventsWidgetNotificationStatus;
  heading: string;
  body: string;
  categoryId: EventsWidgetCategoryCode;

  statusName?: string;
}

export type EventsWidgetNotificationPriority = 'danger' | 'warning' | 'standard'

export type EventsWidgetNotificationStatus = 'new' | 'inWork' | 'closed'

export type EventsWidgetFilterCode = 'all' | 'inWork' | 'closed'

export type EventsWidgetCategoryCode = 'smotr' | 'safety' | 'tasks' | 'equipmentStatus' | 'drops'

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
  notification: EventsWidgetNotification[];
  categories: EventsWidgetCategory[];
  filters: EventsWidgetFilter;
}


export interface EventsWidgetOptions {
  categories: EventsWidgetCategoryCode[];
  filter: EventsWidgetFilterCode;
}
