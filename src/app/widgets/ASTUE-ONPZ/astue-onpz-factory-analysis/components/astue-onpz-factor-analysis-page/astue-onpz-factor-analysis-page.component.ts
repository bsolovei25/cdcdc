import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarType,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisGroup,
    IAstueOnpzFactoryAnalysisSection,
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataShape } from '@shared/functions/common-functions';

@Component({
    selector: 'evj-astue-onpz-factor-analysis-page',
    templateUrl: './astue-onpz-factor-analysis-page.component.html',
    styleUrls: ['./astue-onpz-factor-analysis-page.component.scss'],
})
export class AstueOnpzFactorAnalysisPageComponent implements OnInit, OnChanges {
    @ViewChild('grid') gridContainerRef: ElementRef;

    private readonly infoPaddingPx: number = 13;
    public legendValues$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

    @Input() public dataTemp: IAstueOnpzFactoryAnalysisDiagram = null;
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
        const minValue = this.dataTemp.minmax[0];
        const maxValue = this.dataTemp.minmax[1];
        const trueDelta: number = this.getTrueDelta(maxValue, minValue);
        this.setLegendArray(trueDelta, minValue);
        this.dataTemp.groups
            .flatMap((x) => x.bars)
            .forEach((x) => {
                x.lowLevel = ((x.lowLevel - minValue) / trueDelta) * 100;
                x.topLevel = ((x.topLevel - minValue) / trueDelta) * 100;
            });
        this.data = fillDataShape(this.dataTemp);
        this.changeDetector.detectChanges();
    }

    private setLegendArray(delta: number, min: number): void {
        const array = [min, min + delta * 0.4, min + delta * 0.8];
        this.legendValues$.next(array);
    }

    private getTrueDelta(max: number, min: number): number {
        const gridHeight = this.gridContainerRef.nativeElement.clientHeight;
        return ((max - min) * gridHeight) / (gridHeight - this.infoPaddingPx);
    }
}
