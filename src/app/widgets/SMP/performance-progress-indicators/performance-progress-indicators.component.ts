import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import {
    IPerfCircleDay, IPerfProgCircle,
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

  public progressIndicators: IProgressIndicators;
  public perfCircleDay: IPerfCircleDay[];
  public perfProgCircle: IPerfProgCircle[];
  public perfProgPark: IPerfProgCircle;
  private subscription: Subscription[] = [];

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
            .subscribe(value => this.progressIndicators = value.data)
    );
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
  }

  protected dataHandler(ref: any): void {
  }

}
