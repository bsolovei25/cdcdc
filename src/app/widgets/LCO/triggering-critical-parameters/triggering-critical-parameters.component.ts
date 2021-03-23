import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { EventService } from 'src/app/dashboard/services/widgets/EVJ/event.service';

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
export class TriggeringCriticalParametersComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    isLoading: boolean = true;

    data: ITriggeringCriticalParameters[] = [];

    constructor(
        private eventService: EventService,
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
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
