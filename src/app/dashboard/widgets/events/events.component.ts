import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import {
  EventsWidgetCategory,
  EventsWidgetCategoryCode,
  EventsWidgetData,
  EventsWidgetOptions,
  ICategory
} from "../../models/events-widget";
import { EventsWidgetFilter } from "../../models/events-widget";
import {
  EventsWidgetNotification,
  EventsWidgetNotificationStatus
} from "../../models/events-widget";
import { Subscription } from "rxjs/index";
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  @Input() name = '';
  ng
  isList = false;

  title;

  selectedId: number = 0;

  static itemCols = 30;
  static itemRows = 20;

  category: ICategory[] = [
    { id: 1001, name: "smotr", code: "0" },
    { id: 1002, name: "safety", code: "1" },
    { id: 1003, name: "tasks", code: "2" },
    { id: 1004, name: "equipmentStatus", code: "3" },
    { id: 1005, name: "drops", code: "4" },
  ];

  categories: EventsWidgetCategory[] = [
    {
      code: 'smotr',
      iconUrl: './assets/icons/widgets/events/smotr.svg',
      notificationsCounts: {
        closed: 0,
        all: 0,
      },
      name: 'СМОТР',
      isActive: false
    },
    {
      code: 'safety',
      iconUrl: './assets/icons/widgets/events/safety.svg',
      notificationsCounts: {
        closed: 0,
        all: 0,
      },
      name: "Безопасноть",
      isActive: false
    },
    {
      code: 'tasks',
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      notificationsCounts: {
        closed: 0,
        all: 0,
      },
      name: 'Производственные задания',
      isActive: false
    },
    {
      code: 'equipmentStatus',
      iconUrl: './assets/icons/widgets/events/status.svg',
      notificationsCounts: {
        closed: 0,
        all: 0,
      },
      name: 'Состояния оборудования',
      isActive: false
    },
    {
      code: 'drops',
      iconUrl: './assets/icons/widgets/events/drops.svg',
      notificationsCounts: {
        closed: 0,
        all: 0,
      },
      name: 'Сбросы',
      isActive: false
    },
  ];

  allNotifications: EventsWidgetNotification[] = [];
  notifications: EventsWidgetNotification[] = [];

  filters: EventsWidgetFilter[] = [
    {
      code: "all",
      name: "Все",
      notificationsCount: 0,
      isActive: true
    },
    {
      code: "closed",
      name: "Отработано",
      notificationsCount: 0,
      isActive: false
    },
    {
      code: "inWork",
      name: "В работе",
      notificationsCount: 0,
      isActive: false
    },
  ];

  iconStatus = [
    {
      name: 'inWork',
      iconUrl: './assets/icons/widgets/process/in-work.svg'
    },
    {
      name: 'closed',
      iconUrl: './assets/icons/widgets/process/closed.svg'
    },
    {
      name: 'new',
      iconUrl: './assets/icons/widgets/process/in-work.svg'
    }
  ]

  statuses: { [id in EventsWidgetNotificationStatus]: string; } = {
    "new": 'Новое',
    "inWork": 'В работе',
    "closed": 'Завершено'
  };

  private readonly defaultIconPath = './assets/icons/widgets/events/smotr.svg';
  defaultIcons = './assets/icons/widgets/process/in-work.svg';  // TODO изменить иконки

  private liveSubscription: Subscription;
  private updateSubscription: Subscription;

  constructor(
    // private oldWidgetsService: WidgetsService,
    private eventService: EventService,
    public userSettings: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    public widgetService: NewWidgetService,
    @Inject('widgetId') public id: string
  ) {
    this.liveSubscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title
    });
    this.updateSubscription = this.eventService.updateEvent$.subscribe((value) => {
      if (value) {
        this.wsConnect();
      }
    })

  }

  ngOnInit() {
    this.showMock(this.isMock);
  }

  ngOnDestroy() {
    if (this.liveSubscription) {
      this.liveSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  onCategoryClick(category) {
    category.isActive = !category.isActive;
    this.appendOptions();
  }

  onFilterClick(filter: EventsWidgetFilter) {
    this.filters.forEach(f => f.isActive = false);
    filter.isActive = true;

    this.appendOptions();
    filter.notificationsCount = this.notifications.length;
  }

  private clearNotifications() {
    this.notifications = [];
  }

  private getCurrentOptions(): EventsWidgetOptions {
    const options: EventsWidgetOptions = {
      categories: this.categories.filter(c => c.isActive).map(c => c.code),
      filter: this.filters.find(f => f.isActive).code
    };
    return options;
  }

  private appendOptions() {
    this.clearNotifications();

    const options = this.getCurrentOptions();
    this.notifications = this.applyFilter(this.allNotifications, options);
    // console.log(this.notifications);

    // filtering only at front-end
  }

  // Фильтрация
  private applyFilter(allNotifications: EventsWidgetNotification[], filterOptions: EventsWidgetOptions): EventsWidgetNotification[] {
    var notifications = allNotifications;

    if (filterOptions.filter && filterOptions.filter != 'all')
      notifications = notifications.filter(x => x.status.name == filterOptions.filter);

    if (filterOptions.categories && filterOptions.categories.length > 0)
      notifications = notifications.filter(x => filterOptions.categories.some(c => c == x.category.name));

    // if (notifications.length > this.notificationsMaxCount) {
    // notifications = notifications.slice(0, this.notificationsMaxCount);
    // }

    return notifications;
  }

  private getStatusIcon(name) {
    const idx = this.iconStatus.findIndex(s => s.name === name);
    if (idx !== -1) {
      return this.iconStatus[idx].iconUrl;
    }
  }

  private appendNotifications(remoteNotifications: EventsWidgetNotification[]) {
    const notifications = remoteNotifications.map(n => {
      if (n.category && n.category.name) {
        const iconUrl = this.getNotificationIcon(n.category.name);
        const iconUrlStatus = this.getStatusIcon(n.status.name);
        const statusName = this.statuses[n.status.name]; // TODO check
        return { ...n, iconUrl, statusName, iconUrlStatus };
      }
    });

    this.allNotifications = notifications.reverse();

    this.notifications = this.applyFilter(this.allNotifications, this.getCurrentOptions());
    this.filters.map(f => {
      const options: EventsWidgetOptions = {
        categories: this.categories.filter(c => c.isActive).map(c => c.code),
        filter: f.code
      };
      f.notificationsCount = this.applyFilter(this.allNotifications, options).length;
    })
  }

  // private appendFilterCounters(remoteFilters: EventsWidgetFilter[]) {
  //   this.filters.forEach(f => {
  //     const rf = remoteFilters.find(rf => rf.code === f.code);
  //     if (rf) {
  //       f.notificationsCount = rf.notificationsCount;
  //     }
  //   }
  //   );
  // }

  private appendCategoriesCounters() {
    this.categories.map(c => {
      c.notificationsCounts.all = this.allNotifications.filter(v => v.category.name === c.code).length;
      c.notificationsCounts.closed = this.allNotifications.filter(v => v.category.name === c.code && v.status.code === '2').length;
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
    this.liveSubscription = this.widgetService.getWidgetLiveDataFromWS(this.id, 'events')
      .subscribe((ref: EventsWidgetData) => {
        this.appendNotifications(ref.notifications);
        // this.appendFilterCounters(ref.filters);
        this.appendCategoriesCounters();
        console.log(this.categories);
        // console.log('get_ws_events');
      }
      );
  }

  showMock(show) {
    if (this.isMock) {
      // do nothing
    } else {
      this.wsConnect();
    }
  }

  listView(list: boolean): void {
    list ? this.isList = true : this.isList = false;
  }

  onRemoveButton() {
    this.widgetService.removeItemService(this.id);
    this.userSettings.removeItem();
  }


  async eventClick(eventId: number) {
    this.selectedId = eventId;
    const event = await this.eventService.getEvent(eventId);
    this.eventService.event$.next(event);
  }

  async deleteEvent(id: number) {
    const event = await this.eventService.deleteEvent(id);
    console.log(event);
    const idx = this.notifications.findIndex(n => n.id === id);
    if (id !== -1) {
      this.notifications.splice(idx, 1);
    }
  }

}

