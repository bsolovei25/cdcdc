import {
    Component,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import {
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetFilter,
    IEventsWidgetNotificationPreview,
    EventsWidgetNotificationStatus,
    IEventsWidgetOptions, IPriority,
    IRetrievalEventDto, ISubcategory, IEventsWidgetAttributes
} from '../../../dashboard/models/events-widget';
import { EventService } from '../../../dashboard/services/widgets/event.service';
import { EventsWorkspaceService } from '../../../dashboard/services/widgets/events-workspace.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { ClaimService, EnumClaimWidgets } from '../../../dashboard/services/claim.service';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetSettingsService } from '../../../dashboard/services/widget-settings.service';
import { debounceTime, distinctUntilChanged, throttle } from 'rxjs/operators';
import { IEventSettings } from '../events/events.component';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { IUnits } from '../../../dashboard/models/admin-shift-schedule';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-evj-events',
    templateUrl: './evj-events.component.html',
    styleUrls: ['./evj-events.component.scss']
})
export class EvjEventsComponent extends WidgetPlatform<IEventsWidgetAttributes> implements OnInit, OnDestroy {

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @ViewChild('notifications') notificationsDiv: any;

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.countNotificationsDivCapacity();
    }

    idAllSubCategory: number = 0;

    public claimWidgets: EnumClaimWidgets[] = [];
    public EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    expandedElement: SelectionModel<number> = new SelectionModel<number>(true);
    subCategoriesSelected: SelectionModel<number> = new SelectionModel<number>(true);
    subCategories: ISubcategory[] = [];

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
                all: 0
            },
            name: 'СМОТР',
            isActive: false,
            url: 'https://spb25-cce-mo1.gazprom-neft.local/BLPS_MO/ru_RU/',
            categoryType: 'default'
        },
        {
            id: 1002,
            code: 'safety',
            iconUrl: 'assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Безопасноть',
            isActive: false,
            url: '#',
            categoryType: 'default'
        },
        {
            id: 1003,
            code: 'tasks',
            iconUrl: 'assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Производственные задания',
            isActive: false,
            url: '#',
            categoryType: 'default'
        },
        {
            id: 1004,
            code: 'equipmentStatus',
            iconUrl: 'assets/icons/widgets/events/status.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Состояния оборудования',
            isActive: false,
            url: 'http://spb99-t-merap01/meridium',
            categoryType: 'default'
        },
        {
            id: 1005,
            code: 'drops',
            iconUrl: 'assets/icons/widgets/events/drops.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Сбросы',
            isActive: false,
            url: '#',
            categoryType: 'default'
        },
        {
            id: 9991,
            code: 'safety',
            iconUrl: 'assets/icons/widgets/events/safety.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Безопасность',
            isActive: false,
            url: '#',
            categoryType: 'ed'
        },
        {
            id: 9992,
            code: 'indicators',
            iconUrl: 'assets/icons/widgets/events/indicators.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Производственные показатели',
            isActive: false,
            url: '#',
            categoryType: 'ed'
        },
        {
            id: 9993,
            code: 'resources',
            iconUrl: 'assets/icons/widgets/events/resources.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Вспомогательные ресурсы',
            isActive: false,
            url: '#',
            categoryType: 'ed'
        },
        {
            id: 9994,
            code: 'tasks',
            iconUrl: 'assets/icons/widgets/events/tasks.svg',
            notificationsCounts: {
                open: 0,
                all: 0
            },
            name: 'Производственные задания',
            isActive: false,
            url: '#',
            categoryType: 'ed'
        }
    ];

    public notifications: IEventsWidgetNotificationPreview[] = [];

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
        },
        {
            id: -100,
            code: 'isNotAcknowledged',
            name: 'Не квитировано',
            notificationsCount: 0,
            isActive: false
        }
    ];

    public priority: IPriority;
    public units: IUnits;
    public description: string;

    public iconStatus: { name: string; iconUrl: string }[] = [
        {
            name: 'inWork',
            iconUrl: 'assets/icons/widgets/process/in-work.svg'
        },
        {
            name: 'closed',
            iconUrl: 'assets/icons/widgets/process/closed.svg'
        },
        {
            name: 'new',
            iconUrl: 'assets/icons/widgets/process/in-work.svg'
        }
    ];

    public statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено'
    };

    isCDEvents: boolean = false;

    public appendEventStream$: BehaviorSubject<IEventsWidgetNotificationPreview> =
        new BehaviorSubject<IEventsWidgetNotificationPreview>(null);

    public isPreviewOpened: boolean = false;

    private readonly defaultIconPath: string = 'assets/icons/widgets/events/smotr.svg';

    constructor(
        private eventService: EventService,
        private ewService: EventsWorkspaceService,
        private snackBarService: SnackBarService,
        private claimService: ClaimService,
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
        this.subCategories = await this.eventService.getSubcategory();
        let filterCondition: 'default' | 'ed' = 'default';
        switch (this.widgetType) {
            case 'events-ed':
                filterCondition = 'ed';
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
        this.subCategories.forEach((subCategory, index) => {
            this.categories.forEach((category) => {
                if (!category?.subCategories) {
                    category.subCategories = [{
                        name: 'Показать все события',
                        code: '100',
                        description: 'Показать все события',
                        id: this.idAllSubCategory,
                        parentCategory: null,
                        parentCategoryId: category.id
                    }];
                }
                if (subCategory.parentCategoryId === category.id) {
                    category.subCategories.push(subCategory);
                }
            });
        });
        this.categories.forEach(value => {
            value.subCategories.reverse();
        });
        this.placeNames = await this.eventService.getPlaces(this.id);
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => {
                this.getData();
                this.getStats();
            }),
            this.eventService.currentEventId$.subscribe((ref) => {
                this.selectedId = ref;
            }),
            this.appendEventStream$.asObservable().pipe(
                debounceTime(1000),
                distinctUntilChanged()
            ).subscribe(this.getStats.bind(this))
        );
        await this.getWidgetSettings();
    }

    protected dataHandler(ref: {
        notification: IEventsWidgetNotificationPreview;
        action: string;
    }): void {
        if (
            this.placeNames.length !== 0 &&
            !this.placeNames.find((place) => place === ref.notification?.unit?.name) &&
            ref.action !== 'delete'
        ) {
            return;
        }
        const isCheckCategories: boolean =
            this.categories.some((x) => x.isActive && x.id === ref.notification.category.id)
            || !this.categories.filter((x) => x.isActive).length;
        let filtersIds: number[] = [];
        switch (this.filters.find((x) => x.isActive).code) {
            case 'all':
                filtersIds = [3001, 3002];
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
        const isCheckFilters: boolean = filtersIds.some((x) => x === ref.notification.status.id)
            || (filtersIds.some((x) => x === -100) && !ref.notification.isAcknowledged);
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

    public toggle(id: number): void {
        this.expandedElement.toggle(id);
        setTimeout(() => this.viewport?.checkViewportSize(), 0);
    }

    private async setWidgetSettings(settings: IEventSettings): Promise<void> {
        try {
            await this.widgetSettingsService.saveSettings<IEventSettings>(this.uniqId, settings);
        } catch (e) {
            console.warn('Event widget save settings error: ', e);
        }
    }

    private async getWidgetSettings(): Promise<void> {
        const params = await this.widgetSettingsService.getSettings<IEventSettings>(this.uniqId);
        if (!params?.viewType) {
            return;
        }
        if (
            (params.viewType === 'cards' && !this.isList) ||
            (params.viewType === 'list' && this.isList)
        ) {
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
        if (!category.isActive) {
            this.subCategoriesSelected.clear();
        }
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
        const notificationsDivCapacity = Math.trunc(
            this.notificationsDiv?.nativeElement?.clientWidth / 383
        );
        this.notificationsGrouped = this.sortArray(
            this.notifications,
            this.isList ? notificationsDivCapacity : 1
        );
    }

    private getCurrentOptions(): IEventsWidgetOptions {
        const options: IEventsWidgetOptions = {
            categories: this.categories.filter((c) => c.isActive)?.map((c) => c.id),
            filter: this.filters.find((f) => f.isActive).code,
            dates: this.widgetService.currentDates$.getValue(),
            placeNames: this.placeNames,
            isVideoWall: !!this.attributes?.IsVideoWall,
            sortType: this.attributes?.SortType ?? 'default',
            categoriesType: this.widgetType === 'events-ed' ? 'ed' : 'default',
            priority: this.priority,
            units: this.units,
            description: this.description,
            subCategory: this.subCategoriesSelected.selected.filter(value => value !== 12345)
        };
        return options;
    }

    private clearNotifications(): void {
        this.notifications = [];
        this.countNotificationsDivCapacity();
    }

    private addWsElement(notification: IEventsWidgetNotificationPreview): void {
        if (this.isSound) {
            this.playAudio();
        }
        const idx = this.notifications.findIndex((n) => notification.sortIndex <= n.sortIndex);
        if (this.notifications.length > 0 && idx === -1) {
            return;
        }
        this.appendEventStream$.next(notification);
        if (notification?.category?.name) {
            notification.iconUrl = this.getNotificationIcon(notification.category.name);
            notification.iconUrlStatus = this.getStatusIcon(notification.status.name);
            notification.statusName = this.statuses[notification.status.name]; // TODO check
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
        }
        this.notifications[idx] = notification;
        this.notifications = this.notifications.slice();
        this.countNotificationsDivCapacity();
    }

    private getStatusIcon(name: string): string {
        const idx = this.iconStatus.findIndex((s) => s.name === name);
        if (idx !== -1) {
            return this.iconStatus[idx].iconUrl;
        }
    }

    private appendNotifications(remoteNotifications: IEventsWidgetNotificationPreview[]): void {
        if (remoteNotifications?.length > 0) {
            const notifications = remoteNotifications
                .filter((n) => n.category && n.category.name)
                .map((n) => {
                    const iconUrl = this.getNotificationIcon(n.category.name);
                    const iconUrlStatus = this.getStatusIcon(n.status?.name);
                    const statusName = n.status?.name ? this.statuses[n.status.name] : ''; // TODO
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

    public sortArray(
        arr: IEventsWidgetNotificationPreview[],
        n: number
    ): IEventsWidgetNotificationPreview[][] {
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

    private async getData(lastId: number = 0): Promise<any> {
        this.isAllowScrollLoading = false;
        if (lastId === 0) {
            this.clearNotifications();
        }
        const options = this.getCurrentOptions();
        if (!options.placeNames) {
            this.isAllowScrollLoading = true;
            return;
        }
        const ans = await this.eventService.getBatchData(lastId, options);
        this.appendNotifications(ans);
        this.isAllowScrollLoading = true;
        if (ans?.length > 0) {
            this.viewport?.checkViewportSize();
        }
    }

    private async getStats(): Promise<void> {
        const options = this.getCurrentOptions();
        if (!options.placeNames) {
            return;
        }
        const stats = await this.eventService.getStats(options);
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
                case 'isNotAcknowledged':
                    f.notificationsCount = stats.statsByStatus.find(
                        (sf) => sf.status.id === -100
                    ).count;
                    break;
            }
        });
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

    async sortByFilter(unitNames: string,
                       categoryIds: number[],
                       statusIds: number[],
                       description: string
    ): Promise<void> {
        await this.eventService.getEventsFilter(unitNames, categoryIds,
            statusIds, description);
    }

    priorityOfFilter(priority: IPriority): void {
        this.priority = priority;
        this.getData();
        this.getStats();
    }

    unitsOfFilter(units: IUnits): void {
        this.units = units;
        this.getData();
        this.getStats();
    }

    searchFilter(search: string): void {
        this.description = search;
        this.getData();
        this.getStats();
    }

    toggleSubcategory(id: number): void {
        if (id === this.idAllSubCategory) {
            if (!this.subCategoriesSelected.isSelected(id)) {
                this.subCategories.forEach(value => {
                    this.subCategoriesSelected.select(value.id);
                });
                this.subCategoriesSelected.select(id);
            } else {
                this.subCategoriesSelected.clear();
            }
        } else {
            if (!this.subCategoriesSelected.isSelected(id)) {
                this.subCategoriesSelected.select(id);
                if (this.subCategoriesSelected.selected.length === this.subCategories.length) {
                    this.subCategoriesSelected.select(this.idAllSubCategory);
                }
            } else {
                this.subCategoriesSelected.toggle(id);
                this.subCategoriesSelected.deselect(this.idAllSubCategory);
            }
        }
        this.getData();
        this.getStats();
    }
}
