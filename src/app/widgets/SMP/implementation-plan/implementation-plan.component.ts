import { SmpService } from './../../../dashboard/services/widgets/SMP/smp.service';
import { IImplementationPlan, IAllCrude } from './../../../dashboard/models/SMP/implementation-plan.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

@Component({
    selector: 'evj-implementation-plan',
    templateUrl: './implementation-plan.component.html',
    styleUrls: ['./implementation-plan.component.scss'],
})
export class ImplementationPlanComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IImplementationPlan[] = [];

    constructor(
        protected widgetService: WidgetService,
        private http: HttpClient,
        private smpService: SmpService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.isRealtimeData = false;
    }

    private async getData(): Promise<void> {
        this.data = (await this.smpService.getAllCrude())?.data;
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getData();

        // this.http.get('assets/mock/SMP/implementation-plan/implementation-plan.mock.json')
        //   .subscribe((data: IAllCrude) => {
        //     this.data = data.data;
        // });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
