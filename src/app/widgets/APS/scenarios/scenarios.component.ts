import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IApsProgressBarSettings } from './components/progress-bar/progress-bar.component';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'evj-scenarios',
    templateUrl: './scenarios.component.html',
    styleUrls: ['./scenarios.component.scss'],
})
export class ScenariosComponent extends WidgetPlatform implements OnInit {

    public selectScenario: FormControl = new FormControl('');

    public scenarios: string[] = [
        'НГРУ_июнь_20_Куляшов_15.05_13.44'
    ];

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

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
    }

    public onClick(): void {
        console.log('click');
    }
}
