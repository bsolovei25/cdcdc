import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { IPieChartInputData } from './components/pie-diagram/pie-diagram.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ITruncatedDiagramInputData {
    name: string;
    items: IPieChartInputData[];
}

@Component({
    selector: 'evj-truncated-diagram-traffic-light',
    templateUrl: './truncated-diagram-traffic-light.component.html',
    styleUrls: ['./truncated-diagram-traffic-light.component.scss'],
    animations: [
        trigger('expandCollapse', [
            state('true', style({ minHeight: '45px', height: '45px' })),
            state('false', style({ minHeight: '165px' })),
            transition('1 => 0', animate('200ms')),
            transition('0 => 1', animate('200ms')),
        ]),
    ],
})
export class TruncatedDiagramTrafficLightComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public expandedPanels: Map<number, boolean> = new Map<number, boolean>();
    public data: ITruncatedDiagramInputData[] = [];

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.data.forEach((value, index) => this.expandedPanels.set(index, false));
    }

    public isPanelClosed(id: number): boolean {
        return this.expandedPanels.get(id);
    }

    public togglePanel(id: number): void {
        this.expandedPanels.set(id, !this.expandedPanels.get(id));
    }

    private processData(): void {
        this.data.forEach((item) => {
            item.items.forEach((chart) => {
                chart = this.countHighlightSector(chart);
            });
        });
    }

    protected dataHandler(ref: any): void {
        this.data = ref.groups;
        console.log(this.data);

        this.processData();
    }

    private countHighlightSector(data: IPieChartInputData): IPieChartInputData {
        const countedData = data;
        if (countedData.value < data.yellowUpperBounds) {
            countedData.highLightSector = 0;
        }
        if (countedData.value >= data.yellowUpperBounds && countedData.value <= data.greenUpperBounds) {
            countedData.highLightSector = 1;
        }
        if (countedData.value > data.greenUpperBounds && countedData.value <= data.redUpperBounds) {
            countedData.highLightSector = 2;
        }
        if (countedData.value > data.redUpperBounds) {
            countedData.highLightSector = 2;
        }
        return countedData;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
