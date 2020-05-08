import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IImplementationPlan {
  id: number;
  title: string;
  value: number;
  deviation: string;
  deviationPercent: number;
  factTankLevel: number;
  planTankLevel: number;
}

@Component({
  selector: 'evj-implementation-plan',
  templateUrl: './implementation-plan.component.html',
  styleUrls: ['./implementation-plan.component.scss']
})
export class ImplementationPlanComponent extends WidgetPlatform implements OnInit, OnDestroy {

  public data: IImplementationPlan[] = [
    {
      id: 1,
      title: 'Нефть',
      value: 1232421,
      deviation: '+0,2',
      deviationPercent: 10,
      factTankLevel: 10,
      planTankLevel: 40,
    },
    {
      id: 2,
      title: 'КГС',
      value: 1232421,
      deviation: '+0,2',
      deviationPercent: 10,
      factTankLevel: 10,
      planTankLevel: 40,
    }
  ];

  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.isRealtimeData = false;
  }

  public ngOnInit(): void {
    super.widgetInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  protected dataHandler(ref: any): void {
  }

}
