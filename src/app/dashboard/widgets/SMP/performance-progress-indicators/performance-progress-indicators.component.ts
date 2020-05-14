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
  state: string; /// состояние дня. enum - normal, attantion(?), critical
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
