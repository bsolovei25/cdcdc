import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { IPieChartInputData } from './components/pie-diagram/pie-diagram.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ITruncatedDiagramInputData {
    name: string;
    diagram: IPieChartInputData[];
}

@Component({
    selector: 'evj-truncated-diagram-traffic-light',
    templateUrl: './truncated-diagram-traffic-light.component.html',
    styleUrls: ['./truncated-diagram-traffic-light.component.scss'],
    animations: [
        trigger(
            'expandCollapse', [
                state('true', style({minHeight: '45px', height: '45px'})),
                state('false', style({minHeight: '165px'})),
                transition('1 => 0', animate('200ms')),
                transition('0 => 1', animate('200ms'))
            ]
        )
    ],
})
export class TruncatedDiagramTrafficLightComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public expandedPanels: Map<number, boolean> = new Map<number, boolean>();
    public data: ITruncatedDiagramInputData[] = [
        {
            name: 'Резервуар №505',
            diagram: [
                {
                    name: 'ИОЧ',
                    value: 105,
                    highLightSector: 1,
                },
                {
                    name: 'МОЧ',
                    value: 107,
                    highLightSector: 2,
                },
                {
                    name: 'ИОЧ1',
                    value: 101,
                    highLightSector: 0,
                },
                {
                    name: 'ИОЧ2',
                    value: 99,
                    highLightSector: 1,
                },
                {
                    name: 'ИОЧ2',
                    value: 99,
                    highLightSector: 1,
                },
            ]
        },
        {
            name: 'Резервуар №527',
            diagram: [
                {
                    name: 'ИОЧ',
                    value: 105,
                    highLightSector: 2,
                },
                {
                    name: 'МОЧ',
                    value: 107,
                    highLightSector: 0,
                }
            ]
        },
        {
            name: 'Резервуар №506',
            diagram: [
                {
                    name: 'ИОЧ',
                    value: 105,
                    highLightSector: 1,
                },
                {
                    name: 'МОЧ',
                    value: 107,
                    highLightSector: 2,
                }
            ]
        },
        {
            name: 'Резервуар №502',
            diagram: [
                {
                    name: 'ИОЧ',
                    value: 105,
                    highLightSector: 0,
                },
                {
                    name: 'МОЧ',
                    value: 107,
                    highLightSector: 1,
                }
            ]
        },
    ];

    public static itemCols: number = 14;
    public static itemRows: number = 22;
    public static minItemCols: number = 14;
    public static minItemRows: number = 22;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'flask';
        this.widgetUnits = '%';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.data.forEach((value, index) => this.expandedPanels.set(index, false));
    }

    protected dataHandler(ref: any): void {
        console.log(ref);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public isPanelClosed(id: number): boolean {
        return this.expandedPanels.get(id);
    }

    public togglePanel(id: number): void {
        this.expandedPanels.set(id, !this.expandedPanels.get(id));
    }
}
