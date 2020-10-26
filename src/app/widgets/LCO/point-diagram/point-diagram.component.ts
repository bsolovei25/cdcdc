import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { Subscription } from 'rxjs';
import { IPointDiagramElement } from '../../../dashboard/models/LCO/point-diagram';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-point-diagram',
    templateUrl: './point-diagram.component.html',
    styleUrls: ['./point-diagram.component.scss'],
})
export class PointDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    pointDiagramElements: IPointDiagramElement[] = [
        {
            norm: 0.2,
            percentageValue: 30.6,
            title: 'NO2',
            isCritical: false,
        },
        {
            norm: 0.4,
            percentageValue: 6.6,
            title: 'NO',
            isCritical: false,
        },
        {
            norm: 0.2,
            percentageValue: 80,
            title: 'NH3',
            isCritical: true,
        },
        {
            norm: 0.3,
            percentageValue: 0,
            title: 'C6H6',
            isCritical: false,
        },
        {
            norm: 0.01,
            percentageValue: 0,
            title: 'C6H5OH',
            isCritical: false,
        },
        {
            norm: 0.4,
            percentageValue: 62.6,
            title: 'NO',
            isCritical: false,
        },
        {
            norm: 0.008,
            percentageValue: 0,
            title: 'H2S',
            isCritical: false,
        },
    ];

    public static itemCols: number = 19;
    public static itemRows: number = 16;
    public static minItemCols: number = 19;
    public static minItemRows: number = 16;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = '%';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.pointDiagramElements = ref.chartItems;
    }

    containerIsMock(): string {
        return this.isMock ? '430px' : '100%';
    }
}
