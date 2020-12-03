import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';
import { IScenario } from '../../../dashboard/models/APS/aps-tables.model';

@Component({
    selector: 'evj-aps-scenario-selection',
    templateUrl: './aps-scenario-selection.component.html',
    styleUrls: ['./aps-scenario-selection.component.scss'],
})
export class ApsScenarioSelectionComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    public scenarios: IScenario[] = [null];
    public factorys: {
        name: string
    }[] = [
        {
            name: 'ОНПЗ'
        }
    ];
    public factorysInfo: {
        name: string
    }[] = [
        {
            name: 'План производства'
        }
    ];;
    constructor(
        private apsService: ApsService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.getScenarios();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    private async getScenarios(): Promise<void> {
        const data = await this.apsService.getAllScenario();
        this.scenarios = data;
    }
    private async getCalculations(): Promise<void> {
        await this.apsService.getCalculate();
    }
    calculate($event: MouseEvent): void {
        // this.getCalculations();
    }

    protected dataHandler(ref: any): void {}
}
