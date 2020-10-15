import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import {
    IPerfCircleDay, IPerfProgCircle, IPerfProgPark,
    IProgressIndicators
} from '../../../dashboard/models/SMP/performance-progress-indicators.model';
import { Subscription } from 'rxjs';
import { SmpService } from '../../../dashboard/services/widgets/smp.service';


@Component({
  selector: 'evj-performance-progress-indicators',
  templateUrl: './performance-progress-indicators.component.html',
  styleUrls: ['./performance-progress-indicators.component.scss']
})
export class PerformanceProgressIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  data: IProgressIndicators;
  public progressIndicators: IProgressIndicators;
  public perfCircleDay: IPerfCircleDay[];
  public perfProgCircle: IPerfProgCircle[];
  public perfProgPark: IPerfProgPark;
  constructor(
    protected widgetService: WidgetService,
    private smpService: SmpService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  public ngOnInit(): void {
    super.widgetInit();

    this.subscription.push(
        this.smpService.getProductionProgress()
            .subscribe((value) => {
                this.progressIndicators = value.data; // Получены данные с бэка и записаны в this.progressIndicators
                const array: IPerfProgCircle[] = []; // Создан массив типа обьектов Circle
                // Проход в цикле по каждому circle с бэка
                // Нужно запушить в новый массив array map-данные с бэка
                this.progressIndicators.circle.forEach((circle) => {
                   array.push({
                       title: circle.title,
                       id: circle.id,
                       value: circle.value,
                       icon: circle.icon,
                       gaugePercent: circle.gaugePercent,
                       piePercent: circle.piePercent,
                       isCritical: circle.isCritical,
                       days: circle.days
                   });
                });
            })
    );
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach((subs: Subscription) => subs.unsubscribe());
  }

  protected dataHandler(ref: any): void {
      // this.data = ref;
  }

}
