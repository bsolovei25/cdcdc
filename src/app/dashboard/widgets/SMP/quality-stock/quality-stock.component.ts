import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IQualityStock {
  security: IQualityStockSecurity;
  circle: IQualityStockCircle;
}

export interface IQualityStockSecurity {
  allValue: number;
  filed: number;
  notFiled: number;
}

export interface IQualityStockCircle {
  factPercent: number;
  deviationPercent: number;
  value: number;
  deviation: number;
  deviationStatus: boolean;
}

@Component({
  selector: 'evj-quality-stock',
  templateUrl: './quality-stock.component.html',
  styleUrls: ['./quality-stock.component.scss']
})
export class QualityStockComponent extends WidgetPlatform implements OnInit, OnDestroy {

  public data: IQualityStock = {
    security: {
      allValue: 45321,
      filed: 45321,
      notFiled: 45321,
    },
    circle: {
      factPercent: 85,
      deviationPercent: 2,
      value: 0.2,
      deviation: 0.18,
      deviationStatus: true,
    }
  };

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
