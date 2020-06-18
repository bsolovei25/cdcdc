import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IProductionTrend } from '../../../../models/production-trends.model';
import { LineChartPlatform } from '../../../../models/linechart-platform';
import { IDatesInterval, WidgetService } from '../../../../services/widget.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../../../services/appConfigService';

@Component({
    selector: 'evj-production-trend-graph',
    templateUrl: './production-trend-graph.component.html',
    styleUrls: ['./production-trend-graph.component.scss']
})
export class ProductionTrendGraphComponent
    extends LineChartPlatform<IProductionTrend>
    implements OnInit, OnChanges {

    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 1)
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 2)
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 3)
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 2, 4)
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 5)
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 6)
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 7)
                }
            ]
        },
        {
            graphType: 'plan',
            graphStyle: 'common',
            graph: [
                {
                    value: 1600,
                    timeStamp: new Date(2020, 2, 1)
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 2, 2)
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 3)
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 4)
                },
                {
                    value: 5000,
                    timeStamp: new Date(2020, 2, 5)
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 6)
                },
                {
                    value: 3000,
                    timeStamp: new Date(2020, 2, 7)
                }
            ]
        },
        {
            graphType: 'higherBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1800,
                    timeStamp: new Date(2020, 2, 1)
                },
                {
                    value: 1700,
                    timeStamp: new Date(2020, 2, 2)
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 3)
                },
                {
                    value: 6200,
                    timeStamp: new Date(2020, 2, 4)
                },
                {
                    value: 5200,
                    timeStamp: new Date(2020, 2, 5)
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 6)
                },
                {
                    value: 3200,
                    timeStamp: new Date(2020, 2, 7)
                }
            ]
        },
        {
            graphType: 'lowerBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1400,
                    timeStamp: new Date(2020, 2, 1)
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 2)
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 3)
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 4)
                },
                {
                    value: 4800,
                    timeStamp: new Date(2020, 2, 5)
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 6)
                },
                {
                    value: 2800,
                    timeStamp: new Date(2020, 2, 7)
                }
            ]
        }
    ];

    @Input() dataWs: IProductionTrend[] = null;
    private readonly restUrl: string = null;

    constructor(
        public widgetService: WidgetService,
        private http: HttpClient,
        private appConfigService: AppConfigService
    ) {
        super(widgetService);
        this.restUrl = appConfigService.restUrl;
        this.restUrl = 'http://deploy.funcoff.club:6555';
    }

    protected async restGraphHandler(ref: IDatesInterval): Promise<IProductionTrend[]> {
        console.log(ref);
        try {
            return await this.http.get<IProductionTrend[]>(`${this.restUrl}/api/WidgetData/ed2b05ac-79c5-11ea-92fa-bc5ff45fe692?FromDateTime=${ref.fromDateTime.toISOString()}&ToDateTime=${ref.toDateTime.toISOString()}`).toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
        // return this.dataWs;
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        this.wsDataHandler(this.dataWs);
    }

    public testWs(): void {
        this.wsDataHandler(this.data);
    }
}
