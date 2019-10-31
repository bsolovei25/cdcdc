export interface EventsNotification {
  id: number;
  serialNumber: number;
  priority: EventsNotificationPriority;
  dateTime: Date;
  iconUrl: string;
  statusCode: EventsNotificationStatus;
  heading: string;
  body: string;
  categoryId: string;

  isDanger?: boolean;
  isWarning?: boolean;
  isStandard?: boolean;
  statusName?: string;
}


export type EventsNotificationPriority = 'danger' | 'warning' | 'standard'

export type EventsNotificationStatus = 'new' | 'inWork' | 'closed'
