import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-solid-gauges',
    templateUrl: './solid-gauges.component.html',
    styleUrls: ['./solid-gauges.component.scss'],
})
export class SolidGaugesComponent extends WidgetPlatform implements OnInit {
    static itemCols = 16;
    static itemRows = 10;

    public uniqal;

    public datas = [
        { name: 'СУГ', fact: 11.5, percent: 50, value: 14.5 },
        { name: 'Висбрекинг', fact: 3.07, percent: 70, value: 2.67 },
    ];

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'шт.';
        this.widgetIcon = 'tools';
    }

    public check;

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
