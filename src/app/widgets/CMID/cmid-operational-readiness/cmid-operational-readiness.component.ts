import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { CmidOperationalReadinessService } from "@dashboard/services/widgets/CMID/cmid-operational-readiness/cmid-operational-readiness.service";
import { ICmidOperationalReadiness } from "./cmid-operational-readiness.interface";

@Component({
    selector: 'cmid-operational-readiness',
    templateUrl: './cmid-operational-readiness.component.html',
    styleUrls: ['./cmid-operational-readiness.component.scss'],
})
export class CmidOperationalReadinessComponent extends WidgetPlatform implements OnInit {
    public countStatistic: number;

    constructor(
        public cdRef: ChangeDetectorRef,
        private cmidOperationalReadinessService: CmidOperationalReadinessService,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(){
        this.getMockData();
    }

    private getMockData(): void {
        this.countStatistic = this.cmidOperationalReadinessService.countStatistik;
    }

    protected dataHandler(ref: ICmidOperationalReadiness): void {}
}