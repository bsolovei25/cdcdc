import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncRender } from '@shared/functions/async-render.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarType,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

@Component({
    selector: 'evj-astue-onpz-factory-analysis',
    templateUrl: './astue-onpz-factory-analysis.component.html',
    styleUrls: ['./astue-onpz-factory-analysis.component.scss'],
})
export class AstueOnpzFactoryAnalysisComponent extends WidgetPlatform
    implements OnInit, AfterViewInit {
    @ViewChild('grid') gridContainerRef: ElementRef;

    private readonly infoPaddingPx: number = 13;
    public legendValues$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

    public data: IAstueOnpzFactoryAnalysis = null;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.setData();
    }

    @AsyncRender
    public setData(): void {
        const maxValue: number = 120;
        const minValue: number = 80;
        const trueDelta: number = this.getTrueDelta(maxValue, minValue);
        this.setLegendArray(trueDelta, minValue);
        this.data = {
            legend: null,
            groups: [
                {
                    title: '',
                    bars: [
                        {
                            value: 97.7,
                            title: 'Bar title',
                            lowLevel: ((80 - minValue) / trueDelta) * 100,
                            topLevel: ((97.7 - minValue) / trueDelta) * 100,
                            type: IAstueOnpzFactoryAnalysisBarType.Summary,
                        },
                    ],
                },
                {
                    title: 'Group title',
                    bars: [
                        {
                            value: -7,
                            title: 'Bar title 1',
                            lowLevel: ((100 - minValue) / trueDelta) * 100,
                            topLevel: ((110 - minValue) / trueDelta) * 100,
                            type: IAstueOnpzFactoryAnalysisBarType.Deviation,
                        },
                        {
                            value: 10,
                            title: 'Bar title 2',
                            lowLevel: ((90 - minValue) / trueDelta) * 100,
                            topLevel: ((100 - minValue) / trueDelta) * 100,
                            type: IAstueOnpzFactoryAnalysisBarType.Normal,
                        },
                    ],
                },
            ],
        };
    }

    private setLegendArray(delta: number, min: number): void {
        const array = [min, min + delta * 0.4, min + delta * 0.8];
        this.legendValues$.next(array);
    }

    private getTrueDelta(max: number, min: number): number {
        const gridHeight = this.gridContainerRef.nativeElement.clientHeight;
        return ((max - min) * gridHeight) / (gridHeight - this.infoPaddingPx);
    }

    protected dataHandler(ref: unknown): void {}
}
