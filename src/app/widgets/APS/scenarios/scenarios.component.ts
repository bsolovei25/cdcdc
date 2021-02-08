import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IApsProgressBarSettings } from '@shared/components/aps-progress-bar/aps-progress-bar.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-scenarios',
    templateUrl: './scenarios.component.html',
    styleUrls: ['./scenarios.component.scss'],
})
export class ScenariosComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public selectScenario: FormControl = new FormControl({ value: '', disabled: false });

    public scenarios: string[] = ['НГРУ_июнь_20_Куляшов_15.05_13.44'];

    public barChartSettings1: IApsProgressBarSettings = {
        barColor: '#2378D9',
        barBackgroundColor: '#142E4F',
        isGreaterThan100: true,
        value: 79,
    } as IApsProgressBarSettings;

    public barChartSettings2: IApsProgressBarSettings = {
        barColor: '#2378D9',
        barBackgroundColor: '#FF931E',
        isGreaterThan100: false,
        value: 81,
    } as IApsProgressBarSettings;

    constructor(
        protected widgetService: WidgetService,
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

    protected dataHandler(ref: any): void {}

    public onClick(): void {
        console.log('click');
    }
}
