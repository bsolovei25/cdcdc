import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetData,
    EventsWidgetOptions,
    ICategory,
} from '../../models/events-widget';
import { EventsWidgetFilter } from '../../models/events-widget';
import {
    EventsWidgetNotification,
    EventsWidgetNotificationStatus,
} from '../../models/events-widget';
import { Subscription } from 'rxjs/index';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'evj-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    @Input() name: string = '';
    ng;
    isList: boolean = false;

    title: string = '';
    isDeleteRetrieval: boolean = false;

    selectedId: number = 0;
    eventOverlayId: number;

    static itemCols: number = 30;
    static itemRows: number = 20;

    public previewTitle: string;

    category: ICategory[] = [
        { id: 1001, name: 'smotr', code: '0' },
        { id: 1002, name: 'safety', code: '1' },
        { id: 1003, name: 'tasks', code: '2' },
        { id: 1004, name: 'equipmentStatus', code: '3' },
        { id: 1005, name: 'drops', code: '4' },
    ];

    categories: EventsWidgetCategory[] = [
        {
            code: 'smotr',
            iconUrl: './assets/icons/widgets/events/smotr.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: 'СМОТР',
            isActive: false,
            url: 'https://spb25-cce-mo1.gazprom-neft.local/BLPS_MO/ru_RU/',
        },
        {
            code: 'safety',
            iconUrl: './assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: 'Безопасноть',
            isActive: false,
            url: '#',
        },
        {
            code: 'tasks',
            iconUrl: './assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: 'Производственные задания',
            isActive: false,
            url: '#',
        },
        {
            code: 'equipmentStatus',
            iconUrl: './assets/icons/widgets/events/status.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: 'Состояния оборудования',
            isActive: false,
            url: 'http://spb99-t-merap01/meridium',
        },
        {
            code: 'drops',
            iconUrl: './assets/icons/widgets/events/drops.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: 'Сбросы',
            isActive: false,
            url: '#',
        },
    ];

    allNotifications: EventsWidgetNotification[] = [];
    notifications: EventsWidgetNotification[] = [];

    filters: EventsWidgetFilter[] = [
        {
            code: 'all',
            name: 'Все',
            notificationsCount: 0,
            isActive: true,
        },
        {
            code: 'closed',
            name: 'Отработано',
            notificationsCount: 0,
            isActive: false,
        },
        {
            code: 'inWork',
            name: 'В работе',
            notificationsCount: 0,
            isActive: false,
        },
    ];

    iconStatus = [
        {
            name: 'inWork',
            iconUrl: './assets/icons/widgets/process/in-work.svg',
        },
        {
            name: 'closed',
            iconUrl: './assets/icons/widgets/process/closed.svg',
        },
        {
            name: 'new',
            iconUrl: './assets/icons/widgets/process/in-work.svg',
        },
    ];

    statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено',
    };

    private readonly defaultIconPath =
        './assets/icons/widgets/events/smotr.svg';
    defaultIcons = './assets/icons/widgets/process/in-work.svg'; // TODO изменить иконки

    private liveSubscription: Subscription;
    private updateSubscription: Subscription;

    constructor(
        // private oldWidgetsService: WidgetsService,
        private eventService: EventService,
        public userSettings: NewUserSettingsService,
        @Inject('isMock') public isMock: boolean,
        public widgetService: NewWidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.liveSubscription = this.widgetService
            .getWidgetChannel(id)
            .subscribe((data) => {
                if (data) {
                    this.title = data.title;
                    this.previewTitle = data.widgetType;
                }
            });
        this.updateSubscription = this.eventService.updateEvent$.subscribe(
            (value) => {
                if (value) {
                    this.wsConnect();
                }
            }
        );
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
        const idx = this.filters.findIndex((i) => i.isActive === true);
        if (idx !== -1) {
            this.onFilterClick(this.filters[idx]);
        }
    }

    onFilterClick(filter: EventsWidgetFilter) {
        this.filters.forEach((f) => (f.isActive = false));
        filter.isActive = true;

        this.appendOptions();
        filter.notificationsCount = this.notifications.length;
    }

    private clearNotifications(): void {
        this.notifications = [];
    }

    private getCurrentOptions(): EventsWidgetOptions {
        const options: EventsWidgetOptions = {
            categories: this.categories
                .filter((c) => c.isActive)
                .map((c) => c.code),
            filter: this.filters.find((f) => f.isActive).code,
        };
        return options;
    }

    private appendOptions(): void {
        this.clearNotifications();

        const options = this.getCurrentOptions();
        this.notifications = this.applyFilter(this.allNotifications, options);
        // filtering only at front-end
    }

    sortByPriority() {
        const danger = this.notifications.filter(
            (n) => n.priority.code === '0'
        );
        const warning = this.notifications.filter(
            (n) => n.priority.code === '1'
        );
        const standard = this.notifications.filter(
            (n) => n.priority.code === '2'
        );
        this.notifications = [...danger, ...warning, ...standard];
    }

    // Фильтрация
    private applyFilter(
        allNotifications: EventsWidgetNotification[],
        filterOptions: EventsWidgetOptions
    ): EventsWidgetNotification[] {
        let notifications = allNotifications;

        if (filterOptions.filter && filterOptions.filter === 'all') {
            notifications = notifications.filter(
                (x) => x.status.name !== 'closed'
            );
        }

        if (filterOptions.filter && filterOptions.filter !== 'all') {
            notifications = notifications.filter(
                (x) => x.status.name === filterOptions.filter
            );
        }
        if (filterOptions.categories && filterOptions.categories.length > 0) {
            notifications = notifications.filter((x) =>
                filterOptions.categories.some((c) => c === x.category.name)
            );
        }

        return notifications;
    }

    private getStatusIcon(name) {
        const idx = this.iconStatus.findIndex((s) => s.name === name);
        if (idx !== -1) {
            return this.iconStatus[idx].iconUrl;
        }
    }

    private appendNotifications(
        remoteNotifications: EventsWidgetNotification[]
    ) {
        const notifications = remoteNotifications.map((n) => {
            if (n.category && n.category.name) {
                const iconUrl = this.getNotificationIcon(n.category.name);
                const iconUrlStatus = this.getStatusIcon(n.status.name);
                const statusName = this.statuses[n.status.name]; // TODO check
                return { ...n, iconUrl, statusName, iconUrlStatus };
            }
        });

        this.allNotifications = notifications;

        this.notifications = this.applyFilter(
            this.allNotifications,
            this.getCurrentOptions()
        );
        this.filters.map((f) => {
            const options: EventsWidgetOptions = {
                categories: this.categories
                    .filter((c) => c.isActive)
                    .map((c) => c.code),
                filter: f.code,
            };
            f.notificationsCount = this.applyFilter(
                this.allNotifications,
                options
            ).length;
        });
        this.sortByPriority();
    }

    private appendCategoriesCounters() {
        this.categories.map((c) => {
            c.notificationsCounts.all = this.allNotifications.filter(
                (v) => v.category.name === c.code
            ).length;
            c.notificationsCounts.open = this.allNotifications.filter(
                (v) =>
                    v.category.name === c.code &&
                    (v.status.code === '0' || v.status.code === '1')
            ).length;
        });
    }

    private getNotificationIcon(categoryId: EventsWidgetCategoryCode) {
        const category = this.categories.find((c) => c.code === categoryId);
        if (category) {
            return category.iconUrl;
        }
        return this.defaultIconPath;
    }

    private wsConnect() {
        if (this.liveSubscription) {
            this.liveSubscription.unsubscribe();
        }
        this.liveSubscription = this.widgetService
            .getWidgetLiveDataFromWS(this.id, 'events')
            .subscribe((ref: EventsWidgetData) => {
                this.appendNotifications(ref.notifications);
                this.appendCategoriesCounters();
            });
    }

    snackBar(
        text: string = 'Выполнено',
        status: string = 'complete',
        durection: number = 3000
    ) {
        let snackBar = document.getElementById('snackbar');
        snackBar.className = 'show';
        // snackBar.className = status;
        snackBar.innerText = text;
        setTimeout(function() {
            snackBar.className = snackBar.className.replace('show', '');
        }, durection);
    }

    showMock(show) {
        if (this.isMock) {
            // do nothing
        } else {
            this.wsConnect();
        }
    }

    listView(list: boolean): void {
        list ? (this.isList = true) : (this.isList = false);
    }

    onRemoveButton() {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    async eventClick(deleteItem: boolean, eventId?: number, event?: Event) {
        event.stopPropagation();
        if (deleteItem) {
            try {
                if (this.eventOverlayId >= 0) {
                    const event = await this.eventService.deleteEvent(
                        this.eventOverlayId
                    );
                    this.wsConnect();
                    this.eventService.event$.next(null);
                }
                this.overlayConfirmationClose();
                this.snackBar('Событие удалено');
            } catch (error) {
                this.overlayConfirmationClose();
                this.snackBar('Ошибка', 'error');
            }
        } else {
            this.selectedId = eventId;
            const event = await this.eventService.getEvent(eventId);
            this.eventService.event$.next(event);
        }
        this.eventOverlayId = undefined;
    }

    overlayConfirmationOpen(n: EventsWidgetNotification) {
        event.stopPropagation();
        this.eventOverlayId = n.id;
        n.retrievalEvents.length
            ? (this.isDeleteRetrieval = true)
            : (this.isDeleteRetrieval = false);
        document.getElementById('overlay-confirmation-event').style.display =
            'block';
    }

    overlayConfirmationClose() {
        document.getElementById('overlay-confirmation-event').style.display =
            'none';
        this.eventOverlayId = undefined;
    }

    onClick(e: Event, url: string) {
        e.stopPropagation();
        window.open(url);
    }
}
