import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
    OnDestroy
} from '@angular/core';
import {WidgetService} from "@dashboard/services/widget.service";
import {HttpClient} from "@angular/common/http";
import {WidgetPlatform} from "@dashboard/models/@PLATFORM/widget-platform";
import {BehaviorSubject} from "rxjs";
import {CmidDynamicsOfMetricsChangePageType} from "@widgets/CMID/cmid-dynamics-of-metrics-change/enums/cmid-dynamics-of-metrics-change.enums";
import {cmidDynamicsOfMetricsChangeData} from "@widgets/CMID/cmid-dynamics-of-metrics-change/const/cmid-dynamics-of-metrics-change.const";
import {ICmidDynamicsOfMetricsChangeModel} from "@widgets/CMID/cmid-dynamics-of-metrics-change/models/cmid-dynamics-of-metrics-change.model";

@Component({
  selector: 'evj-cmid-dynamics-of-metrics-change',
  templateUrl: './cmid-dynamics-of-metrics-change.component.html',
  styleUrls: ['./cmid-dynamics-of-metrics-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidDynamicsOfMetricsChangeComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public pageTypes = CmidDynamicsOfMetricsChangePageType;
    public pageType$: BehaviorSubject<CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS> = new BehaviorSubject<CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS>(CmidDynamicsOfMetricsChangePageType.DYNAMICS);
    public selectionReference: { id: string; name: string }[] = [];
    public data: ICmidDynamicsOfMetricsChangeModel[];

    constructor(
        protected widgetService: WidgetService,
        private http: HttpClient,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.data = cmidDynamicsOfMetricsChangeData;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    public changePage(type: CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS): void {
        if (this.pageType$.getValue() === type) {
            return;
        }

        this.pageType$.next(type);
    }
}
