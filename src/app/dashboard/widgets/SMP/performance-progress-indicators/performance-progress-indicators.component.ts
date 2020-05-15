import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IProgressIndicators {
  statePark: IPerfProgPark; /// Состояние парка
  shipment: IPerfProgPark; /// Отгрузка
  circle: IPerfProgCircle[]; /// Массив кругов с визуализацией дней
}

export interface IPerfProgCircle {
  id: number;
  title: string; /// enum (?) => Выработка, Паспортизация, Отгрузка
  value: number;
  icon: string; /// enum (?) => production, passportization, shipment
  gaugePercent: number; /// Процент заполнения внешнего круга, возможно не требуется
  piePercent: number; /// Процент заполнения внутреннего круга
  isCritical: boolean; /// Состояние внутренего круга enum => normal, critical
  days: IPerfCircleDay[]; /// массив дней
}

export interface IPerfCircleDay {
  day: number; // день месяца
  state: string; /// состояние дня. enum - normal, warning, critical, disabled
}

export interface IPerfProgPark {
  capacity: number; /// Вместимость
  balance: number; /// Остаток
  certified: number; /// Паспортизировано
  planLevel: number; /// % (0-100) плана заполнения уровня бака
  factLevel: number; /// % (0-100) фактическое заполнение уровня бака
}

@Component({
  selector: 'evj-performance-progress-indicators',
  templateUrl: './performance-progress-indicators.component.html',
  styleUrls: ['./performance-progress-indicators.component.scss']
})
export class PerformanceProgressIndicatorsComponent extends WidgetPlatform implements OnInit, OnDestroy {

  public data: IProgressIndicators = {
    statePark: {
      capacity: 627920,
      balance: 150000,
      certified: 150000,
      planLevel: 60,
      factLevel: 20,
    },
    shipment: {
      capacity: 627920,
      balance: 150000,
      certified: 150000,
      planLevel: 60,
      factLevel: 20,
    },
    circle: [
      {
        id: 1,
        title: 'Выработка',
        value: 2343234,
        icon: 'production',
        gaugePercent: 60,
        piePercent: 50,
        isCritical: false,
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
        ]
      },
      {
        id: 2,
        title: 'Паспортизация',
        value: 2343234,
        icon: 'passportization',
        gaugePercent: 60,
        piePercent: 50,
        isCritical: true,
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
            state: 'normal',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'normal',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'normal',
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
        ]
      },
      {
        id: 3,
        title: 'Отгрузка',
        value: 2343234,
        icon: 'shipment',
        gaugePercent: 60,
        piePercent: 30,
        isCritical: false,
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
            state: 'normal',
          },
          {
            day: 17,
            state: 'normal',
          },
          {
            day: 18,
            state: 'normal',
          },
          {
            day: 19,
            state: 'normal',
          },
          {
            day: 20,
            state: 'normal',
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
        ]
      },
    ]
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
