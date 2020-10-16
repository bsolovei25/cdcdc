import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IQualityStockSecurity {
  allValue: number;
  filed: number;
  notFiled: number;
}

export interface IQualityStockCircle {
  lowerLimit: number;
  upperLimit: number;
  termo: number;
  electro: number;
  fuel: number;
}

@Component({
  selector: 'evj-quality-stock',
  templateUrl: './quality-stock.component.html',
  styleUrls: ['./quality-stock.component.scss']
})
export class QualityStockComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {


  public dataSecurity: IQualityStockSecurity;
  public dataCircle: IQualityStockCircle;

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
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  protected dataHandler(ref: any): void {
    this.dataSecurity = ref.security;
    this.dataCircle = ref.circle;
  }

}
