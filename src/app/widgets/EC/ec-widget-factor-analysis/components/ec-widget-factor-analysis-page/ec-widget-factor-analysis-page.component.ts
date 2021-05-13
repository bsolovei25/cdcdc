import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAstueOnpzFactoryAnalysisDiagram } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataShape } from '@shared/functions/common-functions';

@Component({
    selector: 'evj-ec-widget-factor-analysis-page',
    templateUrl: './ec-widget-factor-analysis-page.component.html',
    styleUrls: ['./ec-widget-factor-analysis-page.component.scss'],
})
export class EcWidgetFactorAnalysisPageComponent implements OnInit, OnChanges {
    @ViewChild('grid') gridContainerRef: ElementRef;

    private readonly infoPaddingTopPx: number = 15;
    private readonly infoPaddingBottomPx: number = 15;
    private get infoPaddingPx(): number {
        return this.infoPaddingTopPx + this.infoPaddingBottomPx;
    }
    public legendValues$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

    @Input() public dataTemp: IAstueOnpzFactoryAnalysisDiagram = null;
    @Input() public isUnit: boolean = false;
    public data: IAstueOnpzFactoryAnalysisDiagram = null;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.setData();
    }

    @AsyncRender
    public setData(): void {
        if (!this.dataTemp) {
            this.data = null;
            return;
        }
        const temp = fillDataShape(this.dataTemp);
        const maxValue = temp.minmax[1];
        const minValue = temp.minmax[0];
        const trueMin = this.getTrueMin(maxValue, minValue);
        const trueMax = this.getTrueMax(maxValue, minValue);
        const trueDelta: number = this.getTrueDelta(maxValue, minValue);
        this.setLegendArray(trueDelta, trueMin);
        const getPercentLevel = (value: number) => {
            return ((value - trueMin) / trueDelta) * 100;
        };
        temp.groups
            .flatMap((x) => x.diagrams)
            .forEach((x) => {
                x.lowLevel = getPercentLevel(x.type === 'sum' ? trueMin : x.lowLevel);
                x.topLevel = getPercentLevel(x.topLevel);
            });
        temp.groups
            .flatMap((x) => x.diagrams)
            .flatMap((x) => x.content)
            .filter((x) => !!x)
            .forEach((x) => {
                x.lowLevel = getPercentLevel(x.lowLevel);
                x.topLevel = getPercentLevel(x.topLevel);
            });
        this.data = temp;
        this.changeDetector.detectChanges();
    }

    private setLegendArray(delta: number, min: number): void {
        const array = [min, min + delta * 0.4, min + delta * 0.8];
        this.legendValues$.next(array);
    }

    private getTrueDelta(max: number, min: number): number {
        const height = this.gridContainerRef.nativeElement.clientHeight;
        const delta = max - min;
        return (delta * height) / (height - this.infoPaddingPx);
    }

    private getTrueMin(max: number, min: number): number {
        const gridHeight = this.gridContainerRef.nativeElement.clientHeight;
        const percentValue = this.infoPaddingBottomPx / gridHeight;
        return min - this.getTrueDelta(max, min) * percentValue;
    }

    private getTrueMax(max: number, min: number): number {
        const gridHeight = this.gridContainerRef.nativeElement.clientHeight;
        const percentValue = this.infoPaddingTopPx / gridHeight;
        return max + this.getTrueDelta(max, min) * percentValue;
    }
}
