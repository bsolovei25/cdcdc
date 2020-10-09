import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IProducts } from '../../../dashboard/models/SMP/product-groups.model';

@Component({
    selector: 'evj-product-groups',
    templateUrl: './product-groups.component.html',
    styleUrls: ['./product-groups.component.scss'],
})
export class ProductGroupsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IProducts[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
