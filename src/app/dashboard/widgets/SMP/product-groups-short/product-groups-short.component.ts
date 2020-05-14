import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IProducts } from '../product-groups/product-groups.component';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

@Component({
  selector: 'evj-product-groups-short',
  templateUrl: './product-groups-short.component.html',
  styleUrls: ['./product-groups-short.component.scss']
})
export class ProductGroupsShortComponent extends WidgetPlatform implements OnInit, OnDestroy {
  data: IProducts[] = [];

  value: IProducts = {
    id: 1,
    groupName: 'Бензины',
    performance: 3,
    groupValue: 187863,
    groupDeviationValue: 187863,
    groupDeviationNotValue: 142543,
    groupDeviationFlag: 1,
    groupDeviationShip: 321234,
    groupDeviationShipPerformance: 60,
    products: [
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true, /// неизвестные свойства, пока кнопки мок
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        leftTopButton: true,
        leftBottomButton: false,
        leftButton: false,
        rightTopButton: false,
        rightBottomButton: false,
        rightButton: false,
      },
    ],
  };

  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.widgetIcon = 'graph';
    this.isRealtimeData = false;
  }

  ngOnInit(): void {
    super.widgetInit();
    for (let i = 0; i < 20; i++) {
      this.data.push(this.value);
    }
  }


  protected dataHandler(ref: any): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
