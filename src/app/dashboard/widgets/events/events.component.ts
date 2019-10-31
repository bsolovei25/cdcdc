import {Component, OnInit} from '@angular/core';
import {EventsCategory} from "../../models/events-category";
import {EventsFilter} from "../../models/events-filter";
import {WidgetsService} from "../../services/widgets.service";
import {
  EventsNotification,
  EventsNotificationPriority,
  EventsNotificationStatus
} from "../../models/events-notification";

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  categories = [
    {
      iconUrl: './assets/icons/widgets/events/status.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Состояние оборудования отказы",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/safety.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Безопасноть",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Производственные задания и разпоряжения",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/review.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Смотр",
      isActive: false
    },
    {
      id: "5",
      iconUrl: './assets/icons/widgets/events/fire.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Сброс на факел",
      isActive: false
    }
  ];

  notifications: EventsNotification[] = [];

  filters: EventsFilter[] = [
    {
      code: "all",
      name: "Все",
      counter: 11,
      isActive: true
    },
    {
      code: "closed",
      name: "Отработано",
      counter: 11,
      isActive: false
    },
    {
      code: "in-work",
      name: "В работе",
      counter: 10,
      isActive: false
    },
  ];
  statuses: any = {};

  constructor(private widgetsService: WidgetsService) {

    this.statuses[EventsNotificationStatus.NEW] = 'Новое';
    this.statuses[EventsNotificationStatus.IN_WORK] = 'В работе';
    this.statuses[EventsNotificationStatus.CLOSED] = 'Закрыто';


    this.widgetsService.getWidgetLiveDataFromWS('NotificationsChannel', 'events')
      .subscribe((ref) => {


          switch (ref.priority) {

            case EventsNotificationPriority.DANGER:
              ref.isDanger = true;
              break;

            case EventsNotificationPriority.WARNING:
              ref.isWarning = true;
              break;

            case EventsNotificationPriority.STANDARD:
              ref.isStandard = true;
              break;
          }

          ref.statusName = this.statuses[ref.statusCode];
          ref.iconUrl = './assets/icons/widgets/events/review.svg';

          this.notifications.unshift(ref);

          if (this.notifications.length > 5) {
            this.notifications.pop();
          }


        }
      );
  }

  ngOnInit() {
  }

  onCategoryClick(category) {
    category.isActive = !category.isActive;
  }

  onFilterClick(filter) {
    this.filters.forEach(f => f.isActive = false);
    filter.isActive = true;
  }


}
