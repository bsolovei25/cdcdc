import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { HttpClient } from "@angular/common/http";
import { ISuutpCharts } from "./suutp-charts.interface";

@Component({
  selector: 'evj-suutp-general-factory-state',
  templateUrl: './suutp-charts.component.html',
  styleUrls: ['./suutp-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SuutpChartsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: ISuutpCharts;

    constructor(
        protected widgetService: WidgetService,
        public cdRef: ChangeDetectorRef,
        private http: HttpClient,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public isMain: boolean;

    get additionalTitle(): string {
        return this.isMain ? 'Динамика за неделю' : 'Динамика за сутки';
    }

    ngOnInit(): void {
        super.widgetInit();

        setTimeout(() => {
            this.isMain = this.widgetTitle === "Общее состояние завода (СУУТП)";
            this.isMain ? this.mockGeneralChartsDataConnect() : this.mockSpecificChartsDataConnect();
        })
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public async mockGeneralChartsDataConnect(): Promise<void> {
        this.data = await this.http.get<ISuutpCharts>('assets/mock/SUUTP/general-charts.json').toPromise();
        this.cdRef.markForCheck();
    }

    public async mockSpecificChartsDataConnect(): Promise<void> {
        this.data = await this.http.get<ISuutpCharts>('assets/mock/SUUTP/specific-charts.json').toPromise();
        this.cdRef.markForCheck();
    }

    public leftSideWidth(container: HTMLDivElement): string {
      if (!(container?.offsetHeight > 0)) {
            return;
        }
      const height = container.offsetHeight;
      return `width: ${height}px`;
    }

    protected dataHandler(ref: unknown): void {

    }
}
