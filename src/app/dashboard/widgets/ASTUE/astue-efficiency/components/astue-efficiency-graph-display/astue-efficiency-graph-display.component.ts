import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    Input,
    OnDestroy,
} from '@angular/core';
import { IProductionTrend } from '../../../../../models/production-trends.model';
import { LineChartPlatform } from '../../../../../models/linechart-platform';
import { WidgetService, IDatesInterval } from '../../../../../services/widget.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../../../../services/appConfigService';
import { IWsData } from '../../../../production-trend/components/production-trend-graph/production-trend-graph.component';

@Component({
    selector: 'evj-astue-efficiency-graph-display',
    templateUrl: './astue-efficiency-graph-display.component.html',
    styleUrls: ['./astue-efficiency-graph-display.component.scss'],
})
export class AstueEfficiencyGraphDisplayComponent extends LineChartPlatform<IProductionTrend>
    implements OnChanges, OnInit, OnDestroy {
    @Input() dataWs: IProductionTrend[] = null;
    @Input() widgetId: string = null;
    @Output() private toggleDisplay: EventEmitter<false> = new EventEmitter<false>();

    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'plan',
            graphStyle: 'common',
            graph: [
                {
                    value: 1600,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 5000,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 3000,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'higherBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1800,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1700,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 6200,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 5200,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 3200,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'lowerBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1400,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 4800,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 2800,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

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
                        `${this.restUrl}/api/widget-data/` +
                            `ed2b05ac-79c5-11ea-92fa-bc5ff45fe692?FromDateTime=` +
                            `${ref.fromDateTime.toISOString()}&ToDateTime=${ref.toDateTime.toISOString()}`
                    )
                    .toPromise()
            )?.data?.items;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public ngOnChanges(): void {
        this.wsDataHandler(this.dataWs);
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(false);
    }
}
