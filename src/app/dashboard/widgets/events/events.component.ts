import { Component, Input, OnDestroy, OnInit, Inject, ViewChild } from '@angular/core';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetDataPreview,
    EventsWidgetNotificationPreview,
    EventsWidgetOptions,
    ICategory,
} from '../../models/events-widget';
import { EventsWidgetFilter } from '../../models/events-widget';
import {
    EventsWidgetNotification,
    EventsWidgetNotificationStatus,
} from '../../models/events-widget';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { EventService } from '../../services/event.service';
import { MaterialControllerService } from '../../services/material-controller.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WidgetPlatform } from '../../models/widget-platform';
import { throttle } from 'rxjs/operators';

@Component({
    selector: 'evj-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    isList: boolean = false;
    isDeleteRetrieval: boolean = false;
    selectedId: number = 0;
    eventOverlayId: number;

    private isAllowScrollLoading: boolean = true;

    public previewTitle: string;

    public placeNames: string[] = [];

    public categories: EventsWidgetCategory[] = [
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

    public notifications: EventsWidgetNotificationPreview[] = [];

    public filters: EventsWidgetFilter[] = [
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

    public iconStatus: { name: string; iconUrl: string }[] = [
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

    protected static itemCols: number = 30;
    protected static itemRows: number = 20;

    constructor(
        private eventService: EventService,
        private materialService: MaterialControllerService,
        public userSettings: NewUserSettingsService,
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'letter';
    }

    public ngOnInit(): void {
        // super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.placeNames = await this.eventService.getPlaces(this.id);
        this.subscriptions.push(
            this.widgetService.currentDatesObservable.subscribe((ref) => {
                this.getData();
                this.getStats();
            })
        );
    }

    protected dataHandler(ref: any): void {
        for (const place of this.notifications) {
            // TODO что то надо сделать
        }

        switch (ref.action) {
            case 'add':
                this.addWsElement(ref.notification);
                break;
            case 'edit':
                this.editWsElement(ref.notification);
                break;
            case 'delete':
                this.deleteWsElement(ref.notification);
                break;
        }
    }

    // private async wsConnect(): Promise<void> {
    //     this.placeNames = await this.eventService.getPlaces(this.id);
    //     this.subscriptions.push(
    //         this.widgetService
    //             .getWidgetLiveDataFromWS(this.id, 'events')
    //             .subscribe((ref: EventsWidgetDataPreview) => {
    //                 this.wsHandler(ref);
    //             })
    //     );
    //     this.subscriptions.push(
    //         this.widgetService.currentDatesObservable.subscribe((ref) => {
    //             this.getData();
    //             this.getStats();
    //         })
    //     );
    // }

    public onCategoryClick(category: EventsWidgetCategory): void {
        category.isActive = !category.isActive;
        this.getData();
        this.getStats();
    }

    public onFilterClick(filter: EventsWidgetFilter): void {
        this.filters.forEach((f) => (f.isActive = false));
        filter.isActive = true;
        this.getData();
        this.getStats();
    }

    private getCurrentOptions(): EventsWidgetOptions {
        const options: EventsWidgetOptions = {
            categories: this.categories.filter((c) => c.isActive).map((c) => c.id),
            filter: this.filters.find((f) => f.isActive).code,
            dates: this.widgetService.currentDatesObservable.getValue(),
            placeNames: this.placeNames,
        };
        return options;
    }

    private clearNotifications(): void {
        this.notifications = [];
    }

    private wsHandler(data: EventsWidgetDataPreview): void {}

    private addWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => notification.sortIndex <= n.sortIndex);
        console.log(idx);
        if (idx >= 0) {
            if (notification.category && notification.category.name) {
                notification.iconUrl = this.getNotificationIcon(notification.category.name);
                notification.iconUrlStatus = this.getStatusIcon(notification.status.name);
                notification.statusName = this.statuses[notification.status.name]; // TODO check
            }
            this.notifications.splice(idx, 0, notification);
            this.notifications = this.notifications.slice();
        }
    }

    private deleteWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => n.id === notification.id);
        console.log(idx);
        if (idx >= 0) {
            this.notifications.splice(idx, 1);
            this.notifications = this.notifications.slice();
        }
    }

    private editWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => n.id === notification.id);
        console.log(idx);
        if (idx >= 0) {
            if (notification.category && notification.category.name) {
                notification.iconUrl = this.getNotificationIcon(notification.category.name);
                notification.iconUrlStatus = this.getStatusIcon(notification.status.name);
                notification.statusName = this.statuses[notification.status.name]; // TODO check
            }
            this.notifications[idx] = notification;
            this.notifications = this.notifications.slice();
        }
    }

    private getStatusIcon(name: string): string {
        const idx = this.iconStatus.findIndex((s) => s.name === name);
        if (idx !== -1) {
            return this.iconStatus[idx].iconUrl;
        }
    }

    private appendNotifications(remoteNotifications: EventsWidgetNotificationPreview[]): void {
        if (remoteNotifications?.length > 0) {
            const notifications = remoteNotifications
                .filter((n) => n.category && n.category.name)
                .map((n) => {
                    const iconUrl = this.getNotificationIcon(n.category.name);
                    const iconUrlStatus = this.getStatusIcon(n.status.name);
                    const statusName = this.statuses[n.status.name]; // TODO check
                    return { ...n, iconUrl, statusName, iconUrlStatus };
                });

            this.notifications = this.notifications.concat(notifications);
        }
    }

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
        this.viewport.checkViewportSize();
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight &&
            this.notifications.length &&
            this.isAllowScrollLoading
        ) {
            console.log('end scroll');
            throttle(await this.getData(this.notifications[this.notifications.length - 1].id));
        }
    }

    private async getData(lastId: number = 0): Promise<any> {
        this.isAllowScrollLoading = false;
        if (lastId === 0) {
            this.clearNotifications();
        }
        const options = this.getCurrentOptions();
        const ans = await this.eventService.getBatchData(lastId, options);
        this.appendNotifications(ans);
        this.isAllowScrollLoading = true;
        if (ans?.length > 0) {
            this.viewport.checkViewportSize();
        }
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
