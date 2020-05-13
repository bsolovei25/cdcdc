import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';

@Component({
    selector: 'evj-production-deviations',
    templateUrl: './production-deviations.component.html',
    styleUrls: ['./production-deviations.component.scss'],
})
export class ProductionDeviationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 50;
    public static itemRows: number = 27;
    public static minItemCols: number = 50;
    public static minItemRows: number = 27;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
