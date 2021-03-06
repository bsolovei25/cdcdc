import { Component, OnDestroy, OnInit, Inject, ViewChild, HostListener, ElementRef } from '@angular/core';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    IEventsWidgetAttributes,
    IEventsWidgetNotificationPreview,
    IEventsWidgetOptions,
    SortTypeEvents,
} from '../../../dashboard/models/EVJ/events-widget';
import { EventsWidgetFilter } from '../../../dashboard/models/EVJ/events-widget';
import { EventsWidgetNotificationStatus } from '../../../dashboard/models/EVJ/events-widget';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { EventService } from '../../../dashboard/services/widgets/EVJ/event.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { EventsWorkspaceService } from '../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WidgetSettingsService } from '../../../dashboard/services/widget-settings.service';
import { ClaimService, EnumClaimGlobal, EnumClaimWidgets } from '../../../dashboard/services/claim.service';

export interface IEventSettings {
    viewType: 'list' | 'cards';
    options?: IEventsWidgetOptions;
}

@Component({
    selector: 'evj-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss', './cd-events.component.scss'],
})
export class EventsComponent extends WidgetPlatform<IEventsWidgetAttributes> implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @ViewChild('notifications') notificationsDiv: ElementRef;

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.countNotificationsDivCapacity();
    }

    public claimWidgets: EnumClaimWidgets[] = [];
    public EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    isList: boolean = false;
    isSound: boolean = !!localStorage.getItem('sound');
    audio: HTMLAudioElement = new Audio('assets/sound/event/message.mp3');
    selectedId: number = 0;
    eventOverlayId: number;
    timeout: boolean = true;

    public eventAlertInfo$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    private isAllowScrollLoading: boolean = true;

    public previewTitle: string;

    public notificationsGrouped: IEventsWidgetNotificationPreview[][];

    public placeNames: string[] = [];

    public categories: EventsWidgetCategory[] = [];

    public readonly categoriesAll: EventsWidgetCategory[] = [
        {
            id: 1001,
            code: 'smotr',
            iconUrl: 'assets/icons/widgets/events/smotr.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '??????????',
            isActive: false,
            url: 'https://spb25-cce-mo1/BLPS_MO/ru_RU/',
            categoryType: 'default',
        },
        {
            id: 1002,
            code: 'safety',
            iconUrl: 'assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '????????????????????????',
            isActive: false,
            url: '#',
            categoryType: 'default',
        },
        {
            id: 1003,
            code: 'tasks',
            iconUrl: 'assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '???????????????????????????????? ??????????????',
            isActive: false,
            url: '#',
            categoryType: 'default',
        },
        {
            id: 1004,
            code: 'equipmentStatus',
            iconUrl: 'assets/icons/widgets/events/status.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '?????????????????? ????????????????????????',
            isActive: false,
            url: 'http://10.80.128.41/meridium',
            categoryType: 'default',
        },
        {
            id: 1005,
            code: 'drops',
            iconUrl: 'assets/icons/widgets/events/drops.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '????????????',
            isActive: false,
            url: '#',
            categoryType: 'default',
        },
        {
            id: 6001,
            code: 'safety',
            iconUrl: 'assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '????????????????????????',
            isActive: false,
            url: '#',
            categoryType: 'ed',
        },
        {
            id: 6002,
            code: 'indicators',
            iconUrl: 'assets/icons/widgets/events/indicators.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '???????????????????????????????? ????????????????????',
            isActive: false,
            url: '#',
            categoryType: 'ed',
        },
        {
            id: 6003,
            code: 'resources',
            iconUrl: 'assets/icons/widgets/events/resources.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '?????????????????????????????? ??????????????',
            isActive: false,
            url: '#',
            categoryType: 'ed',
        },
        {
            id: 9994,
            code: 'tasks',
            iconUrl: 'assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0,
            },
            name: '???????????????????????????????? ??????????????',
            isActive: false,
            url: '#',
            categoryType: 'ed',
        },
    ];

    public notifications: IEventsWidgetNotificationPreview[] = [];

    public filters: EventsWidgetFilter[] = [
        {
            id: 3001,
            code: 'all',
            name: '??????',
            notificationsCount: 0,
            isActive: true,
        },
        {
            id: 3002,
            code: 'closed',
            name: '????????????????????',
            notificationsCount: 0,
            isActive: false,
        },
        {
            id: 3003,
            code: 'inWork',
            name: '?? ????????????',
            notificationsCount: 0,
            isActive: false,
        },
        {
            id: -100,
            code: 'isNotAcknowledged',
            name: '???? ??????????????????????',
            notificationsCount: 0,
            isActive: false,
        },
    ];

    public iconStatus: { name: string; iconUrl: string }[] = [
        {
            name: 'inWork',
            iconUrl: 'assets/icons/widgets/process/in-work.svg',
        },
        {
            name: 'closed',
            iconUrl: 'assets/icons/widgets/process/closed.svg',
        },
        {
            name: 'new',
            iconUrl: 'assets/icons/widgets/process/in-work.svg',
        },
    ];

    public statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: '??????????',
        inWork: '?? ????????????',
        closed: '??????????????????',
        wasted: '????????????????????',
    };

    public isCDEvents: boolean = false;
    public isEDEvents: boolean = false;

    public appendEventStream$: BehaviorSubject<IEventsWidgetNotificationPreview> = new BehaviorSubject<IEventsWidgetNotificationPreview>(
        null
    );

    public isPreviewOpened: boolean = false;

    private readonly defaultIconPath: string = 'assets/icons/widgets/events/smotr.svg';

    /// For cancel request
    private requestSubscription: { [key: number]: Subscription } = {};

    get isClaimDelete(): boolean {
        return this.claimService.claimGlobal$?.value?.some((x) => x === EnumClaimGlobal.EventsDelete);
    }

    constructor(
        private eventService: EventService,
        private ewService: EventsWorkspaceService,
        private snackBarService: SnackBarService,
        private claimService: ClaimService,
        public userSettings: UserSettingsService,
        public widgetService: WidgetService,
        private widgetSettingsService: WidgetSettingsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetIcon = 'letter';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((data) => {
                this.claimWidgets = data;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        let filterCondition: 'default' | 'ed' = 'default';
        switch (this.widgetType) {
            case 'events-ed':
                filterCondition = 'ed';
                this.isEDEvents = true;
                break;
            case 'cd-events':
                this.isCDEvents = true;
                break;
        }
        this.categories = this.categoriesAll.filter((cat) => {
            if (filterCondition === 'ed' && cat.code === 'tasks') {
                return false;
            }
            return cat.categoryType === filterCondition;
        });

        this.filters = this.filters.filter((x) => {
            return !(!this.attributes?.Acknowledgment && x.code === 'isNotAcknowledged');
        });

        this.placeNames = await this.eventService.getPlaces(this.id);
        const settings = await this.getWidgetSettings();
        this.setWidgetSettings(settings);
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe(() => {
                this.getData();
                this.getStats();
            }),
            this.eventService.currentEventId$.subscribe((ref) => {
                this.selectedId = ref;
            }),
            this.appendEventStream$
                .asObservable()
                .pipe(debounceTime(1000), distinctUntilChanged())
                .subscribe(this.getStats.bind(this))
        );
    }

    protected dataHandler(ref: { notification: IEventsWidgetNotificationPreview; action: string }): void {
        if (
            this.placeNames.length !== 0 &&
            !this.placeNames.find((place) => place === ref.notification?.unit?.name) &&
            ref.action !== 'delete'
        ) {
            return;
        }
        const isCheckCategories: boolean =
            this.categories.some((x) => x.isActive && x.id === ref.notification.category.id) ||
            !this.categories.filter((x) => x.isActive).length;
        this.getStats();
        let filtersIds: number[] = [];
        switch (this.filters.find((x) => x.isActive).code) {
            case 'all':
                filtersIds = this.isEDEvents ? [3001, 3002] : [3001];
                break;
            case 'closed':
                filtersIds = [3003];
                break;
            case 'inWork':
                filtersIds = [3002];
                break;
            case 'isNotAcknowledged':
                filtersIds = [-100];
                break;
        }
        const isCheckFilters: boolean =
            ref.action !== 'add' ||
            filtersIds.some((x) => x === ref.notification.status.id) ||
            (filtersIds.some((x) => x === -100) && !ref.notification.isAcknowledged);
        if (!isCheckFilters || !isCheckCategories) {
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

    private async updateWidgetSettings(
        settingsKey: keyof IEventSettings,
        value: IEventSettings[keyof IEventSettings]
    ): Promise<void> {
        const currentSettings = this.getCurrentWidgetSettings();
        const settings = { ...currentSettings, [settingsKey]: value };
        try {
            await this.widgetSettingsService.saveSettings<IEventSettings>(this.uniqId, settings);
        } catch (e) {
            console.warn('Event widget save settings error: ', e);
        }
    }

    private getCurrentWidgetSettings(): IEventSettings {
        const viewType = this.isList ? 'list' : 'cards';
        const options = this.getCurrentOptions();
        return {
            viewType,
            options,
        };
    }

    private async getWidgetSettings(): Promise<IEventSettings> {
        return await this.widgetSettingsService.getSettings<IEventSettings>(this.uniqId);
    }

    private setWidgetSettings(options: IEventSettings): void {
        this.setViewTypeSettings(options?.viewType);
        this.setOptionsSettings(options?.options);
    }

    private setViewTypeSettings(viewType: 'cards' | 'list'): void {
        if (!viewType || (viewType === 'cards' && !this.isList) || (viewType === 'list' && this.isList)) {
            return;
        }
        if (viewType === 'cards') {
            this.viewChanger(false);
        } else if (viewType === 'list') {
            this.viewChanger(true);
        }
    }

    private setOptionsSettings(options: IEventsWidgetOptions): void {
        if (!options) {
            return;
        }
        this.categories?.forEach((x) => (x.isActive = options.categories.some((o) => o === x.id)));
        this.filters?.forEach((x) => (x.isActive = options.filter === x.code));
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
        const width = !!this.attributes?.IsVideoWall ? 763 : 383;
        const notificationsDivCapacity = this.attributes?.IsVideoWallEd
            ? 3
            : Math.trunc(this.notificationsDiv?.nativeElement?.clientWidth / width);
        this.notificationsGrouped = this.sortArray(this.notifications, this.isList ? notificationsDivCapacity : 1);
    }

    private getCurrentOptions(): IEventsWidgetOptions {
        return {
            categories: this.categories.filter((c) => c.isActive)?.map((c) => c.id),
            filter: this.filters.find((f) => f.isActive).code,
            dates: this.widgetService.currentDates$.getValue(),
            placeNames: this.placeNames,
            isVideoWall: !!this.attributes?.IsVideoWall,
            sortType: this.attributes?.SortType ?? 'default',
            categoriesType: this.widgetType === 'events-ed' ? 'ed' : 'default',
        } as IEventsWidgetOptions;
    }

    private clearNotifications(): void {
        this.notifications = [];
        this.countNotificationsDivCapacity();
    }

    private addWsElement(notification: IEventsWidgetNotificationPreview): void {
        if (this.isSound) {
            this.playAudio();
        }
        let sortType: SortTypeEvents | 'isVideoWall' = this.attributes?.SortType ?? 'default';
        if (this.attributes.IsVideoWall) {
            sortType = 'isVideoWall';
        }
        this.notifications = this.notifications.map((n) => {
            return {
                ...n,
                sortIndex: n.sortIndexes?.find((x) => x?.type === sortType)?.value ?? 0,
            };
        });
        const eventSortIndex: number = notification.sortIndexes?.find((x) => x?.type === sortType)?.value ?? 0;
        const idx = this.notifications.findIndex((n) => eventSortIndex >= n.sortIndex);
        if (this.notifications.length > 0 && idx === -1) {
            return;
        }
        this.appendEventStream$.next(notification);
        if (notification?.category?.name) {
            notification.iconUrl = this.getNotificationIcon(notification.category.name);
            notification.iconUrlStatus = this.getStatusIcon(notification.status.name);
            notification.statusName = this.statuses[notification.status.name]; // TODO add default
            notification?.retrievalEvents.forEach((value) => {
                value.iconUrl = this.getNotificationIcon(value.category.name);
                value.iconUrlStatus = this.getStatusIcon(value.status.name);
            });
        }
        this.notifications.splice(idx, 0, notification);
        this.notifications = this.notifications.slice();
        this.countNotificationsDivCapacity();
    }

    private deleteWsElement(notification: IEventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => n.id === notification.id);
        if (idx >= 0) {
            this.notifications.splice(idx, 1);
            this.notifications = this.notifications.slice();
            this.countNotificationsDivCapacity();
        }
    }

    private editWsElement(notification: IEventsWidgetNotificationPreview): void {
        const idx = this.notifications.findIndex((n) => n.id === notification.id);
        if (idx === -1) {
            return;
        }
        if (notification?.category?.name) {
            notification.iconUrl = this.getNotificationIcon(notification.category.name);
            notification.iconUrlStatus = this.getStatusIcon(notification.status.name);
            notification.statusName = this.statuses[notification.status.name]; // TODO check
            notification?.retrievalEvents.forEach((value) => {
                value.iconUrl = this.getNotificationIcon(value.category.name);
                value.iconUrlStatus = this.getStatusIcon(value.status.name);
            });
        }
        this.notifications[idx] = notification;
        this.editWsElementEd(idx, notification);
        this.notifications = this.notifications.slice();
        this.countNotificationsDivCapacity();
        this.getStats();
    }

    private editWsElementEd(idx: number, notification: IEventsWidgetNotificationPreview): void {
        const options = this.getCurrentOptions();
        if (options.categoriesType !== 'ed') {
            return;
        }
        switch (options.filter) {
            case 'inWork':
                if (notification.isAcknowledged) {
                    this.notifications.splice(idx, 1);
                }
                break;
            case 'closed':
                if (!notification.isAcknowledged) {
                    this.notifications.splice(idx, 1);
                }
                break;
        }
    }

    private getStatusIcon(name: string): string {
        const idx = this.iconStatus.findIndex((s) => s.name === name);
        if (idx !== -1) {
            return this.iconStatus[idx].iconUrl;
        }
    }

    private appendNotifications(remoteNotifications: IEventsWidgetNotificationPreview[]): void {
        if (remoteNotifications?.length > 0) {
            const notifications = remoteNotifications.map((n) => {
                const iconUrl = this.getNotificationIcon(n.category?.name);
                const iconUrlStatus = this.getStatusIcon(n.status?.name);
                const statusName = n.status?.name ? this.statuses[n.status.name] : ''; // TODO
                n?.retrievalEvents.forEach((value) => {
                    value.iconUrl = this.getNotificationIcon(value.category.name);
                    value.iconUrlStatus = this.getStatusIcon(value.status.name);
                });
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
        this.updateWidgetSettings('viewType', this.isList ? 'list' : 'cards');
    }

    // ???????????????? ??????????????
    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
    }

    public async eventClick(eventId?: number): Promise<void> {
        this.selectedId = eventId;
        this.isPreviewOpened = !this.userSettings.isWidgetAvailableOnScreen('events-workspace');
        await this.ewService.editEvent(eventId);
    }

    public closeEventPreview(): void {
        this.isPreviewOpened = false;
        this.selectedId = null;
        this.ewService.event = null;
    }

    public deleteClick(id: number): void {
        if (!this.isClaimDelete) {
            this.snackBarService.openSnackBar(`?? ?????? ???????????????????????? ???????? ?????? ???????????????? ??????????????`, 'error');
            return;
        }
        const info: IAlertWindowModel = {
            isShow: true,
            questionText: '???? ?????????????? ?????? ???????????? ?????????????? ???????????????',
            acceptText: '????',
            cancelText: '??????',
            acceptFunction: () => this.deleteNotification(id),
            closeFunction: () => this.eventAlertInfo$.next(null),
            cancelFunction: () => this.snackBarService.openSnackBar(`???????????????? ????????????????!`),
        };
        this.eventAlertInfo$.next(info);
    }

    private async deleteNotification(id: number): Promise<void> {
        try {
            await this.eventService.deleteEvent(id);
            this.ewService.event = null;
            const idx = this.notifications.findIndex((n) => n.id === id);
            if (idx >= 0) {
                this.notifications.splice(idx, 1);
                this.notifications = this.notifications.slice();
                this.countNotificationsDivCapacity();
            }
            this.snackBarService.openSnackBar(`?????????????? id: ${id} ?????????????? ??????????????!`);
        } catch (error) {
            console.error(error);
        }
    }

    // ?????????????? ?? ?????????????? ????????????????
    public onClickUrl(e: Event, url: string): void {
        e.stopPropagation();
        window.open(url);
    }

    public scrollHandler(event: { target: { offsetHeight: number; scrollTop: number; scrollHeight: number } }): void {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight &&
            this.notifications.length &&
            this.isAllowScrollLoading
        ) {
            this.getData(this.notifications[this.notifications.length - 1].id);
        }
    }

    public checkIfEventSelected(id: number): boolean {
        return this.selectedId === id || this.eventOverlayId === id;
    }

    public sortArray(arr: IEventsWidgetNotificationPreview[], n: number): IEventsWidgetNotificationPreview[][] {
        let i = 0;
        let j = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            j++;
            temp.push(item);
            if (i === n || j === arr.length) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
    }

    private getData(lastId: number = 0): void {
        const subKey: string = 'data';
        this.isAllowScrollLoading = false;
        if (lastId === 0) {
            this.clearNotifications();
        }
        const options = this.getCurrentOptions();
        this.updateWidgetSettings('options', options);
        if (!options.placeNames) {
            this.isAllowScrollLoading = true;
            return;
        }
        this.requestSubscription[subKey]?.unsubscribe();
        this.requestSubscription[subKey] = this.eventService.getBatchDataObserver(lastId, options).subscribe(
            (data) => {
                const ans = data;
                this.appendNotifications(ans);
                if (ans?.length > 0) {
                    this.viewport?.checkViewportSize();
                }
            },
            (err) => {},
            () => {
                this.isAllowScrollLoading = true;
                this.requestSubscription[subKey] = null;
            }
        );
    }

    private getStats(): void {
        const subKey: string = 'stats';
        const options = this.getCurrentOptions();
        if (!options.placeNames) {
            return;
        }
        this.requestSubscription[subKey]?.unsubscribe();
        this.requestSubscription[subKey] = this.eventService.getStatsObserver(options).subscribe(
            (stats) => {
                this.categories.forEach((c) => {
                    switch (options.categoriesType) {
                        case 'default':
                            c.notificationsCounts.all = stats.statsByCategory.find(
                                (sc) => sc.category.id === c.id
                            )?.totalCount;
                            c.notificationsCounts.open = stats.statsByCategory.find(
                                (sc) => sc.category.id === c.id
                            )?.unclosedCount;
                            break;
                        case 'ed':
                            c.notificationsCounts.all = stats.statsByDispatcherScreenCategory.find(
                                (sc) => sc.category.id === c.id
                            )?.totalCount;
                            c.notificationsCounts.open = stats.statsByDispatcherScreenCategory.find(
                                (sc) => sc.category.id === c.id
                            )?.unclosedCount;
                            break;
                    }
                });
                this.filters.forEach((f) => {
                    switch (f.code) {
                        case 'all':
                            f.notificationsCount = stats.statsByStatus.find((sf) => sf.status.id === 3001).count;
                            f.notificationsCount += this.isEDEvents
                                ? 0
                                : stats.statsByStatus.find((sf) => sf.status.id === 3002).count;
                            break;
                        case 'closed':
                            f.notificationsCount = stats.statsByStatus.find((sf) => sf.status.id === 3003).count;
                            break;
                        case 'inWork':
                            f.notificationsCount = stats.statsByStatus.find((sf) => sf.status.id === 3002).count;
                            break;
                        case 'isNotAcknowledged':
                            f.notificationsCount = stats.statsByStatus.find((sf) => sf.status.id === -100).count;
                            break;
                    }
                });
            },
            () => {},
            () => {
                this.requestSubscription[subKey] = null;
            }
        );
    }

    soundSwitch(event: MouseEvent, isSound: boolean): void {
        this.isSound = !isSound;
        localStorage.setItem('sound', `${this.isSound ? 'true' : ''}`);
        if (this.isSound) {
            this.audio.play();
        }
    }

    playAudio(): void {
        if (this.timeout) {
            this.timeout = false;
            this.audio.play();
            setTimeout(() => (this.timeout = true), 2000);
        }
    }
}
