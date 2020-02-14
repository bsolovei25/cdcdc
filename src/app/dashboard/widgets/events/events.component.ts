import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetData, EventsWidgetNotificationPreview,
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
import { MaterialControllerService } from '../../services/material-controller.service';

@Component({
    selector: 'evj-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    isList: boolean = false;
    title: string = '';
    isDeleteRetrieval: boolean = false;

    selectedId: number = 0;
    eventOverlayId: number;

    private isAllowScrollLoading: boolean = true;

    static itemCols: number = 30;
    static itemRows: number = 20;

    public previewTitle: string;

    categories: EventsWidgetCategory[] = [
        {
            id: 1001,
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
            id: 1002,
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
            id: 1003,
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
            id: 1004,
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
            id: 1005,
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
    notifications: EventsWidgetNotificationPreview[] = [];

    filters: EventsWidgetFilter[] = [
        {
            id: 3001,
            code: 'all',
            name: 'Все',
            notificationsCount: 0,
            isActive: true,
        },
        {
            id: 3002,
            code: 'closed',
            name: 'Отработано',
            notificationsCount: 0,
            isActive: false,
        },
        {
            id: 3003,
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

    private readonly defaultIconPath: string = './assets/icons/widgets/events/smotr.svg';
    private subscriptions: Subscription[] = [];

    constructor(
        private eventService: EventService,
        private materialService: MaterialControllerService,
        public userSettings: NewUserSettingsService,
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                if (data) {
                    this.title = data.title;
                    this.previewTitle = data.widgetType;
                }
            })
        );
        this.subscriptions.push(
            this.eventService.updateEvent$.subscribe((value) => {
                if (value) {
                    this.wsConnect();
                }
            })
        );
        this.showMock(this.isMock);
    }

    public ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    private showMock(show: boolean): void {
        if (show) {
            // do nothing
        } else {
            this.getData();
            this.getStats();
            this.wsConnect();
        }
    }

    private wsConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.id, 'events')
                .subscribe((ref: EventsWidgetData) => {
                    this.wsHandler(ref);
                })
        );
    }

    public onCategoryClick(category: EventsWidgetCategory): void {
        // category.isActive = !category.isActive;
        // this.appendOptions();
        // const idx = this.filters.findIndex((i) => i.isActive === true);
        // if (idx !== -1) {
        //     this.onFilterClick(this.filters[idx]);
        // }

        category.isActive = !category.isActive;
        this.getData();
        this.getStats();
    }

    public onFilterClick(filter: EventsWidgetFilter): void {
        // this.filters.forEach((f) => (f.isActive = false));
        // filter.isActive = true;
        // this.appendOptions();
        // filter.notificationsCount = this.notifications.length;

        this.filters.forEach((f) => (f.isActive = false));
        filter.isActive = true;
        this.getData();
        this.getStats();
    }

    private getCurrentOptions(): EventsWidgetOptions {
        const options: EventsWidgetOptions = {
            categories: this.categories.filter((c) => c.isActive).map((c) => c.id),
            filter: this.filters.find((f) => f.isActive).code,
        };
        return options;
    }

    private clearNotifications(): void {
        this.notifications = [];
    }

    private wsHandler(data: EventsWidgetData): void {
        switch (data.action) {
            case 'add':
                this.addWsElement(data.notification);
                break;
            case 'edit':
                this.editWsElement(data.notification);
                break;
            case 'delete':
                this.deleteWsElement(data.notification);
                break;
        }
    }

    private addWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex(n => notification.sortIndex <= n.sortIndex);
        console.log(idx);
        if (idx) {
            this.notifications.splice(idx, 0, notification);
            this.notifications = this.notifications.slice();
        }
    }

    private deleteWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex(n => n.id === notification.id);
        console.log(idx);
        if (idx) {
            this.notifications.splice(idx, 1);
            this.notifications = this.notifications.slice();
        }
    }

    private editWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex(n => n.id === notification.id);
        console.log(idx);
        if (idx) {
            this.notifications[idx] = notification;
        }
    }

    // private appendOptions(): void {
    //     this.clearNotifications();
    //     const options = this.getCurrentOptions();
    //     console.log(options);
    //     this.notifications = this.applyFilter(this.allNotifications, options);
    //     // filtering only at front-end
    // }

    // sortByPriority(): void {
    //     const danger = this.notifications.filter((n) => n.priority.code === '0');
    //     const warning = this.notifications.filter((n) => n.priority.code === '1');
    //     const standard = this.notifications.filter((n) => n.priority.code === '2');
    //     this.notifications = [...danger, ...warning, ...standard];
    // }

    // Фильтрация
    // private applyFilter(
    //     allNotifications: EventsWidgetNotification[],
    //     filterOptions: EventsWidgetOptions
    // ): EventsWidgetNotification[] {
    //     let notifications = allNotifications;
    //     //
    //     // if (filterOptions.filter && filterOptions.filter === 'all') {
    //     //     notifications = notifications.filter((x) => x.status.name !== 'closed');
    //     // }
    //     //
    //     // if (filterOptions.filter && filterOptions.filter !== 'all') {
    //     //     notifications = notifications.filter((x) => x.status.name === filterOptions.filter);
    //     // }
    //     // if (filterOptions.categories && filterOptions.categories.length > 0) {
    //     //     notifications = notifications.filter((x) =>
    //     //         filterOptions.categories.some((c) => c === x.category.name)
    //     //     );
    //     // }
    //     return notifications;
    // }

    private getStatusIcon(name: string): string {
        const idx = this.iconStatus.findIndex((s) => s.name === name);
        if (idx !== -1) {
            return this.iconStatus[idx].iconUrl;
        }
    }

    private appendNotifications(remoteNotifications: EventsWidgetNotificationPreview[]): void {
        const notifications = remoteNotifications.map((n) => {
            if (n.category && n.category.name) {
                const iconUrl = this.getNotificationIcon(n.category.name);
                const iconUrlStatus = this.getStatusIcon(n.status.name);
                const statusName = this.statuses[n.status.name]; // TODO check
                return { ...n, iconUrl, statusName, iconUrlStatus };
            }
        });

        this.notifications = this.notifications.concat(notifications);
        // this.allNotifications = notifications;
        // this.notifications = this.applyFilter(this.allNotifications, this.getCurrentOptions());
        // this.filters.map((f) => {
        //     const options: EventsWidgetOptions = {
        //         categories: this.categories.filter((c) => c.isActive).map((c) => c.code),
        //         filter: f.code,
        //     };
        //     f.notificationsCount = this.applyFilter(this.allNotifications, options).length;
        // });
        // this.sortByPriority();
    }

    // private appendCategoriesCounters() {
    //     this.categories.map((c) => {
    //         c.notificationsCounts.all = this.allNotifications.filter(
    //             (v) => v.category.name === c.code
    //         ).length;
    //         c.notificationsCounts.open = this.allNotifications.filter(
    //             (v) =>
    //                 v.category.name === c.code && (v.status.code === '0' || v.status.code === '1')
    //         ).length;
    //     });
    // }

    private getNotificationIcon(categoryId: EventsWidgetCategoryCode): string {
        const category = this.categories.find((c) => c.code === categoryId);
        if (category) {
            return category.iconUrl;
        }
        return this.defaultIconPath;
    }

    public viewChanger(list: boolean): void {
        this.isList = list;
    }

    // Удаление виджета
    onRemoveButton(): void {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    public async eventClick(deleteItem: boolean, eventId?: number, event?: Event): Promise<void> {
        event.stopPropagation();
        if (deleteItem) {
            try {
                if (this.eventOverlayId >= 0) {
                    await this.eventService.deleteEvent(this.eventOverlayId);
                    this.eventService.event$.next(null);
                }
                this.overlayConfirmationClose();
                this.materialService.openSnackBar('Событие удалено');
            } catch (error) {
                this.overlayConfirmationClose();
                this.materialService.openSnackBar('Ошибка');
            }
        } else {
            this.selectedId = eventId;
            const eventGet = await this.eventService.getEvent(eventId);
            this.eventService.event$.next(eventGet);
        }
        this.eventOverlayId = undefined;
    }

    public overlayConfirmationOpen(notification: EventsWidgetNotification): void {
        event.stopPropagation();
        this.eventOverlayId = notification.id;
        // TODO ждать от бэка флага
        // notification.retrievalEvents.length
        //     ? (this.isDeleteRetrieval = true)
        //     : (this.isDeleteRetrieval = false);
        document.getElementById('overlay-confirmation-event').style.display = 'block';
    }

    public overlayConfirmationClose(): void {
        document.getElementById('overlay-confirmation-event').style.display = 'none';
        this.eventOverlayId = undefined;
    }

    // Переход в систему источник
    public onClickUrl(e: Event, url: string): void {
        e.stopPropagation();
        window.open(url);
    }

    public async scrollHandler(event: any): Promise<void> {
        if (
            event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight &&
            this.notifications.length &&
            this.isAllowScrollLoading
        ) {
            console.log('end scroll');
            await this.getData(this.notifications[this.notifications.length - 1].id);
        }
    }

    private async getData(lastId: number = 0): Promise<void> {
        this.isAllowScrollLoading = false;
        if (lastId === 0) {
            this.clearNotifications();
        }
        const options = this.getCurrentOptions();
        console.log(options);
        const ans = await this.eventService.getBatchData(lastId, options);
        this.appendNotifications(ans);
        this.isAllowScrollLoading = true;
        console.log(lastId);
        console.log(ans);
    }

    private async getStats(): Promise<void> {
        const options = this.getCurrentOptions();
        const stats = await this.eventService.getStats(options);
        console.log(stats);
        this.categories.forEach((c) => {
            c.notificationsCounts.all = stats.statsByCategory.find(
                (sc) => sc.category.id === c.id
            ).totalCount;
            c.notificationsCounts.open = stats.statsByCategory.find(
                (sc) => sc.category.id === c.id
            ).unclosedCount;
        });
        this.filters.forEach((f) => {
            switch (f.code) {
                case 'all':
                    f.notificationsCount = stats.statsByStatus.find(
                        (sf) => sf.status.id === 3001
                    ).count;
                    f.notificationsCount += stats.statsByStatus.find(
                        (sf) => sf.status.id === 3002
                    ).count;
                    break;
                case 'closed':
                    f.notificationsCount = stats.statsByStatus.find(
                        (sf) => sf.status.id === 3003
                    ).count;
                    break;
                case 'inWork':
                    f.notificationsCount = stats.statsByStatus.find(
                        (sf) => sf.status.id === 3002
                    ).count;
                    break;
            }
        });
    }
}
