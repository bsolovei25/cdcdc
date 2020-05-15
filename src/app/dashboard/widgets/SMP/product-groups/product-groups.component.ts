import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IProducts {
  id: number;
  groupName: string; // title - 'Бензин' и тд
  performance: number; /// Отклонение в круге левой панели
  groupValue: number; /// Значение (оформелно) для левой и правой панели
  groupValueTwo: number; /// Второе значение в левом блоке
  pointStatus: string; /// Статус продукта: enum - normal, danger, warning
  ///Left-side button
  /// enum - normal, danger, warning
  groupDeviationValue: string; /// Левая верхняя кнопка
  groupDeviationFlag: string; /// Левая центральная кнопка
  groupDeviationShip: string; /// Левая нижняя кнопка
  groupDeviationAkk: string; /// Правая верхняя кнопка
  groupDeviationUpd: string; /// Правая нижняя кнопка
  ///Right-side
  groupDeviationAllValue: number; /// Значение в круге
  groupDeviationNotValue: number; /// Не оформлено
  gaugePercent: number; /// Процент заполнения круга gauge

  ///Middle-side
  products: ITypeProduct[];

  typeImage?: string;
  isActive?: boolean;
}

export interface ITypeProduct {
  title: string;
  piePercent: number;
  gaugePercent: number;
  pieStatus: string;  /// Статус внутреннего круга: enum - normal, danger, warning
  days: ITypeProductDay[]; /// массив дней
  ///Button
  /// enum - normal, danger, warning
  productFiling: string; /// Левая верхняя кнопка
  productUpdate: string; /// Левая нижняя кнопка
  productCrowded: string; /// Левая большая кнопка
  productFlask: string; /// Правая верхняя кнопка
  productList: string; /// Правая нижняя кнопка
  productBuild: string; /// Правая большая кнопка
}

export interface ITypeProductDay {
  day: number; // день месяца
  state: string; /// состояние дня. enum - normal, warning, critical, disabled
}

@Component({
  selector: 'evj-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent extends WidgetPlatform implements OnInit, OnDestroy {
  data: IProducts[] = [];

  value: IProducts = {
    id: 1,
    groupName: 'Бензины',
    pointStatus: 'normal',
    performance: 3,
    groupValue: 187863,
    groupValueTwo: 187863,
    groupDeviationValue: 'normal',
    groupDeviationFlag: 'normal',
    groupDeviationShip: 'normal',
    groupDeviationAkk: 'normal',
    groupDeviationUpd: 'normal',
    groupDeviationNotValue: 142543,
    groupDeviationAllValue: 321234,
    gaugePercent: 60,
    products: [
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
      },
      {
        title: 'АИ-92',
        piePercent: 70,
        gaugePercent: 70,
        pieStatus: 'normal',
        days: [
          {
            day: 1,
            state: 'normal',
          },
          {
            day: 2,
            state: 'normal',
          },
          {
            day: 3,
            state: 'normal',
          },
          {
            day: 4,
            state: 'normal',
          },
          {
            day: 5,
            state: 'normal',
          },
          {
            day: 6,
            state: 'normal',
          },
          {
            day: 7,
            state: 'normal',
          },
          {
            day: 8,
            state: 'normal',
          },
          {
            day: 9,
            state: 'normal',
          },
          {
            day: 10,
            state: 'normal',
          },
          {
            day: 11,
            state: 'normal',
          },
          {
            day: 12,
            state: 'normal',
          },
          {
            day: 13,
            state: 'normal',
          },
          {
            day: 14,
            state: 'normal',
          },
          {
            day: 15,
            state: 'normal',
          },
          {
            day: 16,
            state: 'warning',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'danger',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'warning',
          },
          {
            day: 21,
            state: 'normal',
          },
          {
            day: 22,
            state: 'normal',
          },
          {
            day: 23,
            state: 'disabled',
          },
          {
            day: 24,
            state: 'disabled',
          },
          {
            day: 25,
            state: 'disabled',
          },
          {
            day: 26,
            state: 'disabled',
          },
          {
            day: 27,
            state: 'disabled',
          },
          {
            day: 28,
            state: 'disabled',
          },
          {
            day: 29,
            state: 'disabled',
          },
          {
            day: 30,
            state: 'disabled',
          },
        ],
        productFiling: 'normal',
        productUpdate: 'normal',
        productCrowded: 'normal',
        productFlask: 'normal',
        productList: 'normal',
        productBuild: 'normal',
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
