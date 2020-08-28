import { Component, Inject, OnInit } from '@angular/core';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
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
export class KpeSafetyComponent extends WidgetPlatform implements OnInit {

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagramData: IKpeGaugeChartData = { plan: 100, fact: 100 };

    public gaugeCards: IKpeSafetyCard[][] = [];

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

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    protected dataHandler(ref: IKpeSafetyData): void {
        this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart);
        this.gaugeCards = this.sortArray(ref.gaugeCards, 4);
        this.deviationDiagramData = ref.deviationDiagram;
    }

    public sortArray(
        arr: IKpeSafetyCard[],
        n: number
    ): IKpeSafetyCard[][] {
        let i = 0;
        let j = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            j++;
            temp.push(item);
            if (i === n || j === arr.length) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
    }
}
