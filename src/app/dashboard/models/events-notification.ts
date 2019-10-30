export interface EventsNotification {
  id: number;
  serialNumber: number;
  priority: number;
  dateTime: Date;
  iconUrl: string;
  statusCode: number;
  heading: string;
  body: string;
  categoryId: string;

  isDanger?: boolean;
  isWarning?: boolean;
  isStandard?: boolean;
  statusName?: string;
}


export enum EventsNotificationPriority {
  DANGER = 0,
  WARNING = 1,
  STANDARD = 2
}

export enum EventsNotificationStatus {
  NEW = 0,
  IN_WORK = 1,
  CLOSED = 2
}
