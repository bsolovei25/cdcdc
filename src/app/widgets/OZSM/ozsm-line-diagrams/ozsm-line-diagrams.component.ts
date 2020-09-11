import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IOZSMLineDiagram } from '../../../dashboard/models/OZSM/ozsm-line-diagram.model';
import { mockData } from './ozsm-line-diagram-mock';

@Component({
    selector: 'evj-ozsm-line-diagrams',
    templateUrl: './ozsm-line-diagrams.component.html',
    styleUrls: ['./ozsm-line-diagrams.component.scss']
})

export class OzsmLineDiagramsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IOZSMLineDiagram[] = mockData;

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
