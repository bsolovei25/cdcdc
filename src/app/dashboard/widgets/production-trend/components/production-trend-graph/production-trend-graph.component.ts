import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { IProductionTrend } from '../../../../models/production-trends.model';
import { LineChartPlatform } from '../../../../models/linechart-platform';
import { IDatesInterval, WidgetService } from '../../../../services/widget.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable } from 'rxjs';
import { IChartMini } from '@shared/models/smart-scroll.model';
import { filter, map } from 'rxjs/operators';

export interface IWsData<T> {
    data: {
        items: T[];
    };
}

@Component({
    selector: 'evj-production-trend-graph',
    templateUrl: './production-trend-graph.component.html',
    styleUrls: ['./production-trend-graph.component.scss'],
})
export class ProductionTrendGraphComponent extends LineChartPlatform<IProductionTrend>
    implements OnChanges, OnInit, OnDestroy {
    @Input() dataWs: IProductionTrend[] = null;
    @Input() widgetId: string = null;
    private readonly restUrl: string = null;
    constructor(
        public widgetService: WidgetService,
        private http: HttpClient,
        private appConfigService: AppConfigService
    ) {
        super(widgetService);
        this.restUrl = appConfigService.restUrl;
    }

    protected async restGraphHandler(ref: IDatesInterval): Promise<IProductionTrend[]> {
        console.log(ref);
        try {
            return (
                await this.http
                    .get<IWsData<IProductionTrend>>(
                        `${this.restUrl}/api/widget-data/ed2b05ac-79c5-11ea-92fa-bc5ff45fe692` +
                            `?FromDateTime=${ref.fromDateTime.toISOString()}` +
                            `&ToDateTime=${ref.toDateTime.toISOString()}`
                    )
                    .toPromise()
            )?.data?.items;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public ngOnInit(): void {}

    public ngOnChanges(): void {
        this.wsDataHandler(this.dataWs);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
