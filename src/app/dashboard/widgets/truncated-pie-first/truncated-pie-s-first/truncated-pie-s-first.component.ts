import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-truncated-pie-s-first',
    templateUrl: './truncated-pie-s-first.component.html',
    styleUrls: ['./truncated-pie-s-first.component.scss'],
})
export class TruncatedPieSFirstComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 16;
    public static itemRows: number = 12;
    public static minItemCols: number = 16;
    public static minItemRows: number = 12;

    public datas: any = [
        { name: 'Статическое Оборудование 1', plan: 5, value: 28 },
        { name: 'Статическое Оборудование 2', plan: 32, value: 5 },
        { name: 'Статическое Оборудование 3', plan: 100, value: 67 },
    ];

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'flask';
        this.widgetUnits = '%';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.values;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
