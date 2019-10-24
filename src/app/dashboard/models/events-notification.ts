export interface EventsNotification {
  id: string;
  serialNumber: number;
  priority: string;
  dateTime: Date;
  iconUrl: string;
  status: EventsNotification;
  heading: string;
  body: string;
}

export interface EventsNotificationStatus {
  code: string;
  name: string;
}

