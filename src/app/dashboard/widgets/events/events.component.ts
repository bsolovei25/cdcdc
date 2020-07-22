import { Component, OnDestroy, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetNotificationPreview,
    EventsWidgetOptions
} from '../../models/events-widget';
import { EventsWidgetFilter } from '../../models/events-widget';
import {
    EventsWidgetNotification,
    EventsWidgetNotificationStatus
} from '../../models/events-widget';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { EventService } from '../../services/widgets/event.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WidgetPlatform } from '../../models/widget-platform';
import { throttle } from 'rxjs/operators';
import { SnackBarService } from '../../services/snack-bar.service';
import { EventsWorkspaceService } from '../../services/widgets/events-workspace.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { BehaviorSubject } from 'rxjs';
import { WidgetSettingsService } from '../../services/widget-settings.service';

export interface IEventSettings {
    viewType: 'list' | 'cards';
}

@Component({
    selector: 'evj-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @ViewChild('notifications') notificationsDiv: any;

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.countNotificationsDivCapacity();
    }

    isList: boolean = false;
    selectedId: number = 0;
    eventOverlayId: number;

    public eventAlertInfo$: BehaviorSubject<IAlertWindowModel> =
        new BehaviorSubject<IAlertWindowModel>(null);

    private isAllowScrollLoading: boolean = true;

    public previewTitle: string;

    public notificationsGrouped: EventsWidgetNotificationPreview[][];

    public placeNames: string[] = [];

    public categories: EventsWidgetCategory[] = [
        {
            id: 1001,
            code: 'smotr',
            iconUrl: './assets/icons/widgets/events/smotr.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'СМОТР',
            isActive: false,
            url: 'https://spb25-cce-mo1.gazprom-neft.local/BLPS_MO/ru_RU/'
        },
        {
            id: 1002,
            code: 'safety',
            iconUrl: './assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Безопасноть',
            isActive: false,
            url: '#'
        },
        {
            id: 1003,
            code: 'tasks',
            iconUrl: './assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Производственные задания',
            isActive: false,
            url: '#'
        },
        {
            id: 1004,
            code: 'equipmentStatus',
            iconUrl: './assets/icons/widgets/events/status.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Состояния оборудования',
            isActive: false,
            url: 'http://spb99-t-merap01/meridium'
        },
        {
            id: 1005,
            code: 'drops',
            iconUrl: './assets/icons/widgets/events/drops.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Сбросы',
            isActive: false,
            url: '#'
        }
    ];

    public notifications: EventsWidgetNotificationPreview[] = [];

    public filters: EventsWidgetFilter[] = [
        {
            id: 3001,
            code: 'all',
            name: 'Все',
            notificationsCount: 0,
            isActive: true
        },
        {
            id: 3002,
            code: 'closed',
            name: 'Отработано',
            notificationsCount: 0,
            isActive: false
        },
        {
            id: 3003,
            code: 'inWork',
            name: 'В работе',
            notificationsCount: 0,
            isActive: false
        }
    ];

    public iconStatus: { name: string; iconUrl: string }[] = [
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
    ];

    public statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено'
    };

    private readonly defaultIconPath: string = './assets/icons/widgets/events/smotr.svg';

    public static itemCols: number = 32;
    public static itemRows: number = 30;
    public static minItemCols: number = 32;
    public static minItemRows: number = 30;

    constructor(
        private eventService: EventService,
        private ewService: EventsWorkspaceService,
        private snackBarService: SnackBarService,
        public userSettings: UserSettingsService,
        public widgetService: WidgetService,
        private widgetSettingsService: WidgetSettingsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'letter';
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.placeNames = await this.eventService.getPlaces(this.id);
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => {
                this.getData();
                this.getStats();
            }),
            this.eventService.currentEventId$.subscribe((ref) => {
                this.selectedId = ref;
            })
        );
        this.getWidgetSettings();
    }

    protected dataHandler(
        ref: { notification: EventsWidgetNotificationPreview, action: string }
    ): void {
        if (
            !(this.placeNames.find((place) => place === ref.notification?.unit?.name)) &&
            ref.action !== 'delete'
        ) {
            return;
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

    private async setWidgetSettings(settings: IEventSettings): Promise<void> {
        try {
            await this.widgetSettingsService.saveSettings<IEventSettings>(this.uniqId, settings);
        } catch (e) {
            console.log('Event widget save settings error: ', e);
        }
    }

    private async getWidgetSettings(): Promise<void> {
        const params = await this.widgetSettingsService.getSettings<IEventSettings>(this.uniqId);
        if (!params?.viewType) {
            return;
        }
        if ((params.viewType === 'cards' && !this.isList) ||
            (params.viewType === 'list' && this.isList)) {
            return;
        }
        if (params.viewType === 'cards') {
            this.viewChanger(false);
        } else if (params.viewType === 'list') {
            this.viewChanger(true);
        }
    }

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

    private countNotificationsDivCapacity(): void {
        const notificationsDivCapacity = Math.trunc(this.notificationsDiv.nativeElement.clientWidth / 383);
        this.notificationsGrouped = this.sortArray(this.notifications, this.isList ? notificationsDivCapacity : 1);
    }

    private getCurrentOptions(): EventsWidgetOptions {
        const options: EventsWidgetOptions = {
            categories: this.categories.filter((c) => c.isActive).map((c) => c.id),
            filter: this.filters.find((f) => f.isActive).code,
            dates: this.widgetService.currentDates$.getValue(),
            placeNames: this.placeNames,
            isVideoWall: this.widgetIsVideoWall
        };
        return options;
    }

    private clearNotifications(): void {
        this.notifications = [];
        this.countNotificationsDivCapacity();
    }

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
            this.countNotificationsDivCapacity();
        }
    }

    private deleteWsElement(notification: EventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => n.id === notification.id);
        if (idx >= 0) {
            this.notifications.splice(idx, 1);
            this.notifications = this.notifications.slice();
            this.countNotificationsDivCapacity();
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
            this.countNotificationsDivCapacity();
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
            this.countNotificationsDivCapacity();
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
        this.countNotificationsDivCapacity();
        this.setWidgetSettings({ viewType: list ? 'list' : 'cards' });
    }

    // Удаление виджета
    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
        // this.widgetService.removeItemService(this.uniqId);
    }

    public async eventClick(eventId?: number): Promise<void> {
        this.selectedId = eventId;
        await this.ewService.editEvent(eventId);
    }

    public deleteClick(id: number): void {
        const info: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены что хотите удалить событие?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.deleteNotification(id),
            closeFunction: () => this.eventAlertInfo$.next(null),
            cancelFunction: () => this.snackBarService.openSnackBar(`Удаление отменено!`)
        };
        this.eventAlertInfo$.next(info);
    }

    private async deleteNotification(id: number): Promise<void> {
        try {
            await this.eventService.deleteEvent(id);
            this.ewService.event = null;
            const idx = this.notifications.findIndex((n) => n.id === id);
            console.log(idx);
            if (idx >= 0) {
                this.notifications.splice(idx, 1);
                this.notifications = this.notifications.slice();
                this.countNotificationsDivCapacity();
            }
            this.snackBarService.openSnackBar(`Событие id: ${id} успешно удалено!`);
        } catch (error) {
            console.error(error);
        }

    }

    // Переход в систему источник
    public onClickUrl(e: Event, url: string): void {
        e.stopPropagation();
        window.open(url);
    }

    public async scrollHandler(event: any): Promise<void> {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight &&
            this.notifications.length &&
            this.isAllowScrollLoading
        ) {
            console.log('end scroll');
            throttle(await this.getData(this.notifications[this.notifications.length - 1].id));
        }
    }

    public checkIfEventSelected(id: number): boolean {
        return this.selectedId === id || this.eventOverlayId === id;
    }

    public sortArray(arr: EventsWidgetNotificationPreview[], n: number): EventsWidgetNotificationPreview[][] {
        let i = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            temp.push(item);
            if (i === n) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
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
