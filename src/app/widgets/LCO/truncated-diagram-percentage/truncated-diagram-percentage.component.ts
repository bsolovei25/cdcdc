import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-truncated-diagram-percentage',
    templateUrl: './truncated-diagram-percentage.component.html',
    styleUrls: ['./truncated-diagram-percentage.component.scss'],
})
export class TruncatedDiagramPercentageComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public datas: any = [
        { name: 'Статическое Оборудование 1', plan: 5, value: 28 },
        { name: 'Статическое Оборудование 2', plan: 32, value: 5 },
        { name: 'Статическое Оборудование 3', plan: 100, value: 67 },
    ];

    constructor(
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
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
