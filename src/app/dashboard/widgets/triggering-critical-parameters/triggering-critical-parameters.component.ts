import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { EventService } from '../../services/event.service';
import { NewWidgetService } from '../../services/new-widget.service';


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
    selector: "evj-triggering-critical-parameters",
    templateUrl: "./triggering-critical-parameters.component.html",
    styleUrls: ["./triggering-critical-parameters.component.scss"]
})
export class TriggeringCriticalParametersComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;

    public title = '';
    private subscription: Subscription;

    data: ITriggeringCriticalParameters[] = [
        {
            equipment: 'ЭЛОУ-2',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'С.100 ЭЛОУ-АВТ-6',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: false
        },
        {
            equipment: 'УПВ',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'АВТ-3',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: false
        },
        {
            equipment: 'ЭЛОУ-2',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'С.100 ЭЛОУ-АВТ-6',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: false
        },
        {
            equipment: 'Блок ВТ (АТВБ)',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: false
        },
        {
            equipment: 'УПВ',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: false
        },
        {
            equipment: 'АВТ-3',
            gasContamination: 14,
            deLockKeys: 0,
            fireAlarm: 23,
            lockAndAlarm: 0,
            PIDControllers: 0,
            vibrodiagnosticSystems: 10,
            electricalHeatingSystems: 0,
            nonCritical: true
        },
    ]

    static itemCols = 15;
    static itemRows = 18;

    constructor(
        private eventService: EventService,
        public widgetService: NewWidgetService,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {

        if (!this.isMock) {
            this.subscription = this.eventService.event$.subscribe((value) => {
                if (value) {

                }
            })
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
