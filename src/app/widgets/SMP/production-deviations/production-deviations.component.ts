import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IProductionDeviationsGraph } from '../../../dashboard/models/SMP/production-deviations.model';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-production-deviations',
    templateUrl: './production-deviations.component.html',
    styleUrls: ['./production-deviations.component.scss'],
})
export class ProductionDeviationsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public isDataLoading: boolean = true;

    public data: IProductionDeviationsGraph[] = null;

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
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
        setTimeout(() => (this.isDataLoading = false), 500);
    }
}
