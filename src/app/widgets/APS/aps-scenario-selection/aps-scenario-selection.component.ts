import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';
import { IScenario } from '../../../dashboard/models/APS/aps-tables.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'evj-aps-scenario-selection',
    templateUrl: './aps-scenario-selection.component.html',
    styleUrls: ['./aps-scenario-selection.component.scss'],
})
export class ApsScenarioSelectionComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public scenarios: BehaviorSubject<IScenario[]> = new BehaviorSubject<IScenario[]>([]);
    public factorys: {
        name: string;
    }[] = [
        {
            name: 'ОНПЗ',
        },
    ];
    public factorysInfo: {
        name: string;
    }[] = [
        {
            name: '2019_ОНПЗ_УП_на Апрель',
        },
    ];

    constructor(
        public apsService: ApsService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.getScenarios().then();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    private async getScenarios(): Promise<void> {
        this.scenarios.next(await this.apsService.getAllScenario());
        this.apsService.selectScenario$.next(this.scenarios?.value[0] ?? null);
    }
    calculate($event: MouseEvent): void {
        this.apsService.calculateScenario(this.apsService.selectScenario$.value);
    }
    public getScenarioId(event: any): void {
        this.apsService.selectScenario$.next(event.value);
    }
    protected dataHandler(ref: any): void {}
}
