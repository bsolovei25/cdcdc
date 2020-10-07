import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/widgets/event.service';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';

export interface ITriggeringCriticalParameters {
    equipment: string;
    gasContamination: number;
    deLockKeys: number;
    fireAlarm: number;
    lockAndAlarm: number;
    piDControllers: number;
    vibrodiagnosticSystems: number;
    electricalHeatingSystems: number;
    nonCritical: boolean;
}

@Component({
    selector: 'evj-triggering-critical-parameters',
    templateUrl: './triggering-critical-parameters.component.html',
    styleUrls: ['./triggering-critical-parameters.component.scss'],
})
export class TriggeringCriticalParametersComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    isLoading: boolean = true;

    data: ITriggeringCriticalParameters[] = [];

    public static itemCols: number = 18;
    public static itemRows: number = 30;
    public static minItemCols: number = 15;
    public static minItemRows: number = 30;

    constructor(
        private eventService: EventService,
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { items: ITriggeringCriticalParameters[] }): void {
        if (this.isLoading) {
            setTimeout(() => (this.isLoading = false), 500);
        }

        this.data = ref.items;
    }
}
