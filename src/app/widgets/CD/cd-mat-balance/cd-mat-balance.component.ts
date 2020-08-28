import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { ICDModalWindow } from '../cd-shared/cd-modal-window/cd-modal-window.component';
import { INavItem } from '../../../dashboard/components/aps-dropdown-menu/aps-dropdown-menu.component';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { EventsWorkspaceService } from '../../../dashboard/services/widgets/events-workspace.service';
import {
    EventsWidgetNotification,
    ISaveMethodEvent,
    IUser,
} from '../../../dashboard/models/events-widget';
import { EventService } from '../../../dashboard/services/widgets/event.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { AuthService } from '@core/service/auth.service';
import { ICdIndicatorLoad } from './components/cd-mat-balance-gauge/cd-mat-balance-gauge.component';

export interface IMatBalance {
    loads: ICdIndicatorLoad;
    params: IParams;
    sensors: ISensors;
    streams: IStreams;
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
}

@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss'],
})
export class CdMatBalanceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    isSelectedEl: number;
    data: IMatBalance;
    openEvent: EventsWidgetNotification = this.cdMatBalanceService.isOpenEvent$.getValue();
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
                                    description: '',
                                    establishedFacts: '',
                                    responsible: null,
                                    acceptFunction: () => {
                                        console.log(this.modal);
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
                this.userService.LoadScreenByWidget('events-workspace');
                this.ewtService.editEvent(this.cdMatBalanceService.isOpenEvent$.getValue()?.id);
                this.cdMatBalanceService.isOpenEvent$.next(null);
            },
        },
    ];

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
        this.subscriptions.push(
            this.cdMatBalanceService.showDeviation.subscribe((value) => {
                this.isSelectedEl = value;
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
            console.log(ref);
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
        const event: EventsWidgetNotification = {
            category: this.openEvent.category,
            priority: this.openEvent.priority,
            parentId: this.openEvent.id,
            isAcknowledged: this.openEvent.isAcknowledged,
            status: this.openEvent.status,
            unit: this.openEvent.unit,
            responsibleOperator,
            description,
            establishedFacts: '',
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
            const events = await this.ewService.postEventRetrieval(event);
            this.snackBar.openSnackBar('Корректирующие мероприятие создано');
        } catch (e) {}
    }
}
