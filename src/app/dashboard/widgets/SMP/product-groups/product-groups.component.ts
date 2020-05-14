import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IProducts {
  id: number;
  groupName: string; // title - 'Бензин' и тд
  performance: number; /// Отклонение в круге левой панели
  groupValue: number; /// Значение (оформелно) для левой и правой панели
  groupValueTwo: number; /// Второе значение в левом блоке
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
