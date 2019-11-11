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
  statuses: { [id in EventsNotificationStatus] : string; } = {
    "new": 'Новое',
    "inWork": 'В работе',
    "closed": 'Закрыто'
  };

  constructor(private widgetsService: WidgetsService) {

    this.widgetsService.getWidgetLiveDataFromWS('NotificationsChannel', 'events')
      .subscribe((ref) => {


          switch (ref.priority) {

            case 'danger':
              ref.isDanger = true;
              break;

            case 'warning':
              ref.isWarning = true;
              break;

            case 'standard':
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
