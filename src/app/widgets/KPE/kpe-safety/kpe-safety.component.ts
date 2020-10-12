import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';

export interface IKpeSafetyData {
    gaugeCards: IKpeSafetyCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
}

export interface IKpeSafetyCard {
    title: string;
    unit: string;
    deviation?: number;
    fact: number;
    plan: number;
}

@Component({
    selector: 'evj-kpe-safety',
    templateUrl: './kpe-safety.component.html',
    styleUrls: ['./kpe-safety.component.scss']
})
export class KpeSafetyComponent extends WidgetPlatform<unknown> implements OnInit, AfterViewInit {

    @ViewChild('mainGauge') public gaugeChart: ElementRef;

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagramData: IKpeGaugeChartData = { plan: 100, fact: 100 };

    public gaugeCards: IKpeSafetyCard[][] = [];

    private isRendered: boolean = false;

    constructor(protected widgetService: WidgetService,
                private kpeHelperService: KpeHelperService,
                @Inject('isMock') public isMock: boolean,
                @Inject('widgetId') public id: string,
                @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngAfterViewInit(): void {
        queueMicrotask(() => this.isRendered = true);
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        if (!this.isRendered) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    protected dataHandler(ref: IKpeSafetyData): void {
        this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart);
        this.gaugeCards = this.kpeHelperService.sortArray<IKpeSafetyCard>(ref.gaugeCards, 4);
        this.deviationDiagramData = ref.deviationDiagram;
    }
}
