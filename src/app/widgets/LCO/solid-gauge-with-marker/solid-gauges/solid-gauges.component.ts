import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-solid-gauges',
    templateUrl: './solid-gauges.component.html',
    styleUrls: ['./solid-gauges.component.scss'],
})
export class SolidGaugesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public datas: any = [
        { name: 'СУГ', fact: 11.5, percent: 50, value: 14.5 },
        { name: 'Висбрекинг', fact: 3.07, percent: 70, value: 2.67 },
    ];

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'шт.';
        this.widgetIcon = 'speedo';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.values;
    }
}
