import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  EventsWidgetCategory,
  EventsWidgetCategoryCode,
  EventsWidgetData,
  EventsWidgetOptions
} from "../../models/events-widget";
import {EventsWidgetFilter} from "../../models/events-widget";
import {WidgetsService} from "../../services/widgets.service";
import {
  EventsWidgetNotification,
  EventsWidgetNotificationStatus
} from "../../models/events-widget";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  @Input() id? = 'NotificationsChannel';
  @Input() name = '';

  private isMock = true;

  categories: EventsWidgetCategory[] = [
    {
      code: 'smotr',
      iconUrl: './assets/icons/widgets/events/smotr.svg',
      notificationsCounts: {
        closed: null,
        all: null,
      },
      name: 'СМОТР',
      isActive: false
    },
    {
      code: 'safety',
      iconUrl: './assets/icons/widgets/events/safety.svg',
      notificationsCounts: {
        closed: null,
        all: null,
      },
      name: "Безопасноть",
      isActive: false
    },
    {
      code: 'tasks',
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      notificationsCounts: {
        closed: null,
        all: null,
      },
      name: 'Производственные задания и распоряжения',
      isActive: false
    },
    {
      code: 'equipmentStatus',
      iconUrl: './assets/icons/widgets/events/status.svg',
      notificationsCounts: {
        closed: null,
        all: null,
      },
      name: 'Состояния оборудования',
      isActive: false
    },
    {
      code: 'drops',
      iconUrl: './assets/icons/widgets/events/drops.svg',
      notificationsCounts: {
        closed: null,
        all: null,
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

  private readonly notificationsMaxCount = 5;
  private readonly defaultIconPath = './assets/icons/widgets/events/smotr.svg';

  private liveSubscription: Subscription;


  constructor(private widgetsService: WidgetsService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.liveSubscription) {
      this.liveSubscription.unsubscribe();
    }
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

  private getCurrentOptions() {
    const options: EventsWidgetOptions = {
      categories: this.categories.filter(c => c.isActive).map(c => c.code),
      filter: this.filters.find(f => f.isActive).code
    };
    return options;
  }

  private appendOptions() {
    this.clearNotifications();

    const options = this.getCurrentOptions();
    this.widgetsService.appendWidgetLiveOptions(this.id, options);
  }

  private appendNotifications(remoteNotifications: EventsWidgetNotification[]) {
    const notifications = remoteNotifications.map(n => {
      const iconUrl = this.getNotificationIcon(n.category.name);
      const statusName = this.statuses[n.status.name]; // TODO check
      return {...n, iconUrl, statusName};
    });

    this.notifications.unshift(...notifications.reverse());
    if (this.notifications.length > this.notificationsMaxCount) {
      this.notifications = this.notifications.slice(0, this.notificationsMaxCount);
    }
  }

  private appendFilterCounters(remoteFilters: EventsWidgetFilter[]) {
    this.filters.forEach(f => {
        const rf = remoteFilters.find(rf => rf.code === f.code);
        if (rf) {
          f.notificationsCount = rf.notificationsCount;
        }
      }
    );
  }

  private appendCategoriesCounters(remoteCategories: EventsWidgetCategory[]) {
    this.categories.forEach(c => {
        const rc = remoteCategories.find(rf => rf.code === c.code);
        if (rc) {
          c.notificationsCounts = rc.notificationsCounts;
        }
      }
    );
  }

  private getNotificationIcon(categoryId: EventsWidgetCategoryCode) {
    const category = this.categories.find(c => c.code === categoryId);
    if (category) {
      return category.iconUrl;
    }

    return this.defaultIconPath;

  }

  private wsConnect() {
    const options = this.getCurrentOptions();
    this.liveSubscription = this.widgetsService.getWidgetLiveDataFromWS(this.id, 'events', options)
      .subscribe((ref: EventsWidgetData) => {
          this.appendNotifications(ref.notifications);
          this.appendFilterCounters(ref.filters);
          this.appendCategoriesCounters(ref.categories);
        }
      );
  }

  @Input()
  set showMock(show) {
    this.isMock = show;
    if (this.isMock) {
      this.wsConnect();
    } else {
    }
  }

}
