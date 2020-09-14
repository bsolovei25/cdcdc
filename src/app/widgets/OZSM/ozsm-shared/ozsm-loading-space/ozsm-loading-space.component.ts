import { Component, Inject, OnInit } from '@angular/core';
import { WidgetService } from '../../../../dashboard/services/widget.service';
import { ILoadingSpaceModel } from '../../../../dashboard/models/loading-space.model';

@Component({
  selector: 'evj-ozsm-warehouse-loading',
  templateUrl: './ozsm-loading-space.component.html',
  styleUrls: ['./ozsm-loading-space.component.scss']
})
export class OzsmLoadingSpaceComponent implements OnInit {
    public data: ILoadingSpaceModel = mockData;

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

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
