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
      iconUrl: './assets/icons/widgets/events/smotr.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "СМОТР",
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
      name: "Производственные задания и распоряжения",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/status.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Состояния оборудования",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/drops.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Сбросы",
      isActive: false
    },
  ];

  // notifications: EventsNotification[] = [];

  notifications: any[] = [
    {
      id: 1,
      serialNumber: 123,
      priority: "danger",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 2,
      serialNumber: 1243,
      priority: "warning",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "standart",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "danger",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    }
  ];


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
