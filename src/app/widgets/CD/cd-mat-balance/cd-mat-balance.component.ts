import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { ICDModalWindow } from '../cd-shared/cd-modal-window/cd-modal-window.component';
import { INavItem } from '../../../dashboard/components/aps-dropdown-menu/aps-dropdown-menu.component';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { EventsWorkspaceService } from '../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IEventsWidgetNotification, IUser } from '../../../dashboard/models/EVJ/events-widget';
import { EventService } from '../../../dashboard/services/widgets/EVJ/event.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { AuthService } from '@core/service/auth.service';
import { ICdIndicatorLoad } from './components/cd-mat-balance-gauge/cd-mat-balance-gauge.component';

export interface IMatBalance {
    loads: ICdIndicatorLoad[];
    params: IParams[];
    sensors: ISensors[];
    streams: IStreams[];
    title: string;
    widgetType: string;
}

export interface IParams {
    unit: { description: string; name: string };
    unitParams: IUnitParams[];
}

export interface IUnitParams {
    description: string;
    deviation: number;
    deviationState: number;
    engUnits: string;
    id: number;
    max: number;
    min: number;
    modelValue: number;
    name: string;
    value: number;
}

export interface ISensors {
    id: number;
    name: string;
    value: number;
    engUnits: string;
    description: string;
    deviation: number;
    max: number;
    min: number;
    modelValue: number;
    subChannelId: string;
}

export interface IStreams {
    id: number;
    description: string;
    deviation: number;
    modelValue: number;
    name: string;
    value: number;
    engUnits: string;
    percentLoad: number;
    totalDeviation: number;
    totalModelValue: number;
    totalValue: number;
    subChannelId: string;
}

export interface IModalDeviation {
    id: number;
    name: string;
    valueFact: number;
    valueModel: number;
    valueDeviation: number;
    engUnits: string;
    top: number;
}

export interface IAllEstablishedFacts {
    code: string;
    id: number;
    name: string;
}

@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss'],
})
export class CdMatBalanceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IMatBalance;
    openEvent: IEventsWidgetNotification = this.cdMatBalanceService.isOpenEvent$.getValue();
    modal: ICDModalWindow;

    public items: INavItem[] = [
        {
            name: 'Добавить корректирующие мероприятие',
            value: 0,
            children: [
                {
                    name: 'Данные',
                    value: 0,
                    children: [
                        {
                            name: 'Передать в службу КИПиА',
                            value: 0,
                            onClick: () => {
                                this.modal = {
                                    users: this.ewtService.users,
                                    acceptText: 'Отправить в службу КИПиА',
                                    date: new Date(),
                                    time: new Date(),
                                    description: this.openEvent.description,
                                    establishedFacts: '',
                                    allEstablishedFacts: [],
                                    responsible: null,
                                    acceptFunction: () => {
                                        this.saveEvents(
                                            this.modal.responsible,
                                            this.modal.description,
                                            this.modal.establishedFacts,
                                            this.modal.date,
                                            this.modal.time
                                        );
                                    },
                                    cancelFunction: () => {
                                        this.modal = null;
                                    },
                                };
                            },
                        },
                    ],
                },
                {
                    name: 'Модель',
                    value: 0,
                },
                {
                    name: 'Техпроцесс',
                    value: 0,
                },
            ],
        },
        {
            name: 'Вернуться к карточке события',
            value: 0,
            onClick: () => {
                this.userService.loadScreenByWidget('events-workspace');
                this.ewtService.editEvent(this.cdMatBalanceService.isOpenEvent$.getValue()?.id);
                this.cdMatBalanceService.isOpenEvent$.next(null);
            },
        },
    ];

    modalDeviation: IModalDeviation;

    constructor(
        protected widgetService: WidgetService,
        private cdMatBalanceService: CdMatBalanceService,
        private userService: UserSettingsService,
        public ewService: EventService,
        public ewtService: EventsWorkspaceService,
        private snackBar: SnackBarService,
        private authService: AuthService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
        }
    }

    async saveEvents(
        responsibleOperator: IUser,
        description: string,
        facts: string,
        date: Date,
        time: Date
    ): Promise<void> {
        const dateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes()
        );
        const event: IEventsWidgetNotification = {
            category: this.openEvent.category,
            priority: this.openEvent.priority,
            parentId: this.openEvent.id,
            isAcknowledged: this.openEvent.isAcknowledged,
            status: this.openEvent.status,
            unit: this.openEvent.unit,
            responsibleOperator,
            description,
            facts: [
                {
                    comment: facts,
                    createdAt: new Date(),
                    displayName: this.authService.user$.getValue()?.displayName,
                },
            ],
            deadline: dateTime,
            eventDateTime: dateTime,
            fixedBy: this.authService.user$.getValue(),
            retrievalEvents: [],
        };
        try {
            await this.ewService.postEventRetrieval(event);
            this.snackBar.openSnackBar('Корректирующие мероприятие создано');
        } catch (e) {}
    }

    closeModal(): void {
        this.modalDeviation = null;
    }

    openModalDeviation(item: IModalDeviation): void {
        this.modalDeviation = item;
    }
}
