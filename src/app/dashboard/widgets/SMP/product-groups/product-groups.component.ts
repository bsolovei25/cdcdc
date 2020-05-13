import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IProducts {
  groupName: string;
  performance: number;
  groupValue: number;
  groupDeviationValue: number;
  groupDeviationFlag: number;
  groupDeviationShip: number;
  groupDeviationNotValue: number;
  groupDeviationShipPerformance: number;
  products: ITypeProduct[];
  typeImage?: string;
  isActive?: boolean;
}

export interface ITypeProduct {
  title: string;
  piePercent: number;
  gaugePercent: number;
  leftTopButton: boolean; /// неизвестные свойства, пока кнопки мок
  leftBottomButton: boolean;
  leftButton: boolean;
  rightTopButton: boolean;
  rightBottomButton: boolean;
  rightButton: boolean;
}

@Component({
  selector: 'evj-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent extends WidgetPlatform implements OnInit, OnDestroy {
  data: IProducts[] = [
    {
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
    },
    {
      groupName: 'Бензины',
      performance: 3,
      groupValue: 187863,
      groupDeviationValue: 187863,
      groupDeviationFlag: 1,
      groupDeviationShip: 0,
      groupDeviationShipPerformance: 0,
      groupDeviationNotValue: 142543,
      products: [
        {
          title: 'АИ-95',
          piePercent: 70,
          gaugePercent: 70,
          leftTopButton: true, 
          leftBottomButton: false,
          leftButton: false,
          rightTopButton: false,
          rightBottomButton: false,
          rightButton: false,
        }
      ],
    },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // this.dataService.data$.subscribe((data) => {
      //   if (!data?.items) {
      //     return;
      //   }
      //   console.log(data.items.productSummary);
      //   this.map(data.items.productSummary);
      //   this.isScroll(data.items.productSummary);
      // })
    );
  }

  ngAfterViewInit(): void { }

  protected dataHandler(ref: any): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cdRef.detach();
  }

}
