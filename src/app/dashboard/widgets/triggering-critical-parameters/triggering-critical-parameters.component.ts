import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/widgets/event.service';
import { WidgetService } from '../../services/widget.service';

export interface ITriggeringCriticalParameters {
    equipment: string;
    gasContamination: number;
    deLockKeys: number;
    fireAlarm: number;
    lockAndAlarm: number;
    PIDControllers: number;
    vibrodiagnosticSystems: number;
    electricalHeatingSystems: number;
    nonCritical: boolean;
}

@Component({
    selector: 'evj-triggering-critical-parameters',
    templateUrl: './triggering-critical-parameters.component.html',
    styleUrls: ['./triggering-critical-parameters.component.scss'],
})
export class TriggeringCriticalParametersComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;

    public title = '';
    private subscription: Subscription;

    data: ITriggeringCriticalParameters[] = [
        {
            equipment: 'ЭЛОУ-АВТ-6',
            gasContamination: 1,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 24,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-2',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'С.100 ЭЛОУ-АВТ-6',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'УПВ',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'АВТ-3',
            gasContamination: 4,
            deLockKeys: 0,
            fireAlarm: 1,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'Изомеризация',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Л-22/4',
            gasContamination: 2,
            deLockKeys: 0,
            fireAlarm: 6,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'Л-24-2000',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Л-24/5',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Реагентное хоз-во',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'ЛЧ-35-11-300М',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'УПБ',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'С-200 КУПН СТО',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'УПС',
            gasContamination: 2,
            deLockKeys: 0,
            fireAlarm: 1,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 4,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'С-400 КУПН ГФУ',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'КЦА',
            gasContamination: 3,
            deLockKeys: 0,
            fireAlarm: 1,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 4,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'ЛЧ-35-11-1000',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'МТБЭ',
            gasContamination: 4,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 5,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'С-300 КУПН',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'ГФУ-2',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'АССБ и КТ',
            gasContamination: 4,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'Парк Б,Р и ДТ',
            gasContamination: 1,
            deLockKeys: 0,
            fireAlarm: 8,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'ТАМЭ',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Т-д транснефть',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'Г-43-107',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'ГОБКК',
            gasContamination: 0,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: false,
        },
        {
            equipment: 'ЖД эстакажы',
            gasContamination: 4,
            deLockKeys: 0,
            fireAlarm: 0,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
        {
            equipment: 'АВТО эстакажы',
            gasContamination: 1,
            deLockKeys: 0,
            fireAlarm: 3,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 0,
            electricalHeatingSystems: 0,
            nonCritical: true,
        },
    ];

    public static itemCols: number = 18;
    public static itemRows: number = 30;
    public static minItemCols: number = 15;
    public static minItemRows: number = 30;

    public previewTitle: string;

    constructor(
        private eventService: EventService,
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit() {
        if (!this.isMock) {
            this.subscription = this.eventService.event$.subscribe((value) => {
                if (value) {
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
