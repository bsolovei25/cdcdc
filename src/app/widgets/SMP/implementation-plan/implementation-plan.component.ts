import { IImplementationPlan } from './../../../dashboard/models/SMP/implementation-plan.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';


@Component({
  selector: 'evj-implementation-plan',
  templateUrl: './implementation-plan.component.html',
  styleUrls: ['./implementation-plan.component.scss']
})
export class ImplementationPlanComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

  public data: IImplementationPlan[] = [];

  constructor(
    protected widgetService: WidgetService,
    private http: HttpClient,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  public ngOnInit(): void {
    super.widgetInit();

    this.http.get('assets/mock/SMP/implementation-plan/implementation-plan.mock.json')
      .subscribe((data: IImplementationPlan[]) => {
        this.data = data;
    });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  protected dataHandler(ref: any): void {
  }

}
