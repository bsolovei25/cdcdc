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
import {PageType} from "@widgets/CMID/cmid-dynamics-of-metrics-change/enums/pageType";

@Component({
  selector: 'evj-cmid-dynamics-of-metrics-change',
  templateUrl: './cmid-dynamics-of-metrics-change.component.html',
  styleUrls: ['./cmid-dynamics-of-metrics-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidDynamicsOfMetricsChangeComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public pageTypes = PageType;
    public pageType$: BehaviorSubject<PageType.DYNAMICS | PageType.STATISTICS> = new BehaviorSubject<PageType.DYNAMICS | PageType.STATISTICS>(PageType.DYNAMICS);
    public selectionReference: { id: string; name: string }[] = [];

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
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    public changePage(type: PageType.DYNAMICS | PageType.STATISTICS): void {
        if (this.pageType$.getValue() === type) {
            return;
        }

        this.pageType$.next(type);
    }
}
