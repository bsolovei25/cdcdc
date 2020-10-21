import { IDataProgressGroup, IProductGroups } from './../../../dashboard/models/SMP/product-groups.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { SmpService } from '../../../dashboard/services/widgets/SMP/smp.service';

@Component({
    selector: 'evj-product-groups-short',
    templateUrl: './product-groups-short.component.html',
    styleUrls: ['./product-groups-short.component.scss'],
})
export class ProductGroupsShortComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IProductGroups[] = [];

    constructor(
        protected widgetService: WidgetService,
        private http: HttpClient,
        private smpService: SmpService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();

        // this.getData();

        this.http
            .get('assets/mock/SMP/product-groups/product-groups.mock.json')
            .subscribe((data: IDataProgressGroup) => {
                this.data = data.data.items;
            });
    }

    private async getData(): Promise<void> {
        this.data = (await this.smpService.getDataProgressGroup())?.data.items;
    }

    protected dataHandler(ref: any): void {
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
