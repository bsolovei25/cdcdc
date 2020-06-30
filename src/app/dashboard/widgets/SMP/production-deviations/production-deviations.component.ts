import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';
import { IProductionDeviationsGraph } from '../../../models/SMP/production-deviations.model';

@Component({
    selector: 'evj-production-deviations',
    templateUrl: './production-deviations.component.html',
    styleUrls: ['./production-deviations.component.scss'],
})
export class ProductionDeviationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public isDataLoading: boolean = true;

    public data: IProductionDeviationsGraph[] = null;

    public static itemCols: number = 37;
    public static itemRows: number = 27;
    public static minItemCols: number = 37;
    public static minItemRows: number = 27;

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
        this.showLoader();
    }

    public showLoader(): void {
        this.isDataLoading = true;

        setTimeout(() => (this.isDataLoading = false), 1500);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
        this.data.forEach((item) => {
            item.columns.forEach((col) => {
                col.date = new Date(col.date);
            });
        });
    }
}
