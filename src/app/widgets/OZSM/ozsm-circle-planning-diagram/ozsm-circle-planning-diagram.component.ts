import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { ICircleData } from '../../../dashboard/models/OZSM/ozsm-circle-planning-diagram.model';
import { cardData, planData } from './ozsm-circle-planning-diagam-mock';

@Component({
  selector: 'evj-ozsm-circle-planning-diagram',
  templateUrl: './ozsm-circle-planning-diagram.component.html',
  styleUrls: ['./ozsm-circle-planning-diagram.component.scss']
})
export class OzsmCirclePlanningDiagramComponent
    extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public cData: ICircleData[] = cardData;
    public pData: ICircleData[] = planData;
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
