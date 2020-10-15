import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import {
    IPerfCircleDay, IPerfCircleDayFB, IPerfProgCircle, IPerfProgCircleFB, IPerfProgPark, IPerfProgParkFB,
    IProgressIndicators, IProgressIndicatorsFB
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
  public progressIndicators: IProgressIndicators;

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
                    const newShipment: IPerfProgPark = {
                        capacity: value.data.shipment.maxRest,
                        balance: value.data.shipment.deathRest,
                        certified: value.data.shipment.nFact,
                        planLevel: value.data.shipment.factAll,
                        factLevel: value.data.shipment.fact,
                    };
                    const newStatePark: IPerfProgPark = {
                        capacity: value.data.statePark.maxRest,
                        balance: value.data.statePark.deathRest,
                        certified: value.data.statePark.passportrest,
                        planLevel: value.data.statePark.allRest,
                        factLevel: value.data.statePark.freeRest,
                    };
                    const newCircles: IPerfProgCircle[] = [];
                    const month: IPerfCircleDay[] = [];
                    value.data.circle.forEach((circle) => {
                        circle.days.forEach((d) => {
                            month.push({
                                day: d.day,
                                state: d.critical.toString()
                            });
                        });
                        newCircles.push({
                            title: circle.title,
                            id: circle.id,
                            value: circle.value,
                            icon: circle.icon,
                            piePercent: circle.prodPlanPer,
                            gaugePercent: 100,
                            isCritical: !!circle.critical,
                            days: month
                        });
                    });
                    this.progressIndicators = {
                        shipment: newShipment,
                        statePark: newStatePark,
                        circle: newCircles
                    };
            })
    );
    console.log(`this.progressIndicators: ${this.progressIndicators}`);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
  }

  protected dataHandler(ref: any): void {
      // this.data = ref;
  }

}
