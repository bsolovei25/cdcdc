export interface EventsCategory {
  iconUrl: string;
  counts: EventsCategoryCounts;
  name: string;
  isActive: boolean;
}

export interface EventsCategoryCounts {
  closed: number;
  all: number;
}
