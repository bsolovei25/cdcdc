import {Component, OnInit} from '@angular/core';
import {EventsWidgetCategory, EventsWidgetOptions} from "../../models/events-widget";
import {EventsWidgetFilter} from "../../models/events-widget";
import {WidgetsService} from "../../services/widgets.service";
import {
  EventsWidgetNotification,
  EventsWidgetNotificationStatus
} from "../../models/events-widget";

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  categories: EventsWidgetCategory[] = [
    {
      code: 'smotr',
      iconUrl: './assets/icons/widgets/events/smotr.svg',
      notificationsCounts: {
        closed: 5,
        all: 10,
      },
      name: 'СМОТР',
      isActive: false
    },
    {
      code: 'safety',
      iconUrl: './assets/icons/widgets/events/safety.svg',
      notificationsCounts: {
        closed: 5,
        all: 10,
      },
      name: "Безопасноть",
      isActive: false
    },
    {
      code: 'tasks',
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      notificationsCounts: {
        closed: 5,
        all: 10,
      },
      name: 'Производственные задания и распоряжения',
      isActive: false
    },
    {
      code: 'equipmentStatus',
      iconUrl: './assets/icons/widgets/events/status.svg',
      notificationsCounts: {
        closed: 5,
        all: 10,
      },
      name: 'Состояния оборудования',
      isActive: false
    },
    {
      code: 'drops',
      iconUrl: './assets/icons/widgets/events/drops.svg',
      notificationsCounts: {
        closed: 5,
        all: 10,
      },
      name: 'Сбросы',
      isActive: false
    },
  ];

  notifications: EventsWidgetNotification[] = [];

  filters: EventsWidgetFilter[] = [
    {
      code: "all",
      name: "Все",
      notificationsCount: 11,
      isActive: true
    },
    {
      code: "closed",
      name: "Отработано",
      notificationsCount: 11,
      isActive: false
    },
    {
      code: "inWork",
      name: "В работе",
      notificationsCount: 10,
      isActive: false
    },
  ];

  statuses: { [id in EventsWidgetNotificationStatus]: string; } = {
    "new": 'Новое',
    "inWork": 'В работе',
    "closed": 'Закрыто'
  };


  constructor(private widgetsService: WidgetsService) {

    this.widgetsService.getWidgetLiveDataFromWS('NotificationsChannel', 'events')
      .subscribe((ref) => {

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
    this.appendOptions();
  }

  onFilterClick(filter) {
    this.filters.forEach(f => f.isActive = false);
    filter.isActive = true;

    this.appendOptions();
  }

  private clearNotifications() {
    this.notifications = [];
  }

  private appendOptions() {
    this.clearNotifications();

    const options: EventsWidgetOptions = {
      categories: this.categories.filter(c => c.isActive).map(c => c.code),
      filter: this.filters.find(f => f.isActive).code
    };
    // TODO send to server
    console.log(options);
  }


}
