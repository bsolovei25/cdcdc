import {
    AfterViewInit,
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

    @Input() public dataTemp: IAstueOnpzFactoryAnalysis = null;
    public data: IAstueOnpzFactoryAnalysis = null;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnInit(): void {
        // this.setData();
    }

    ngOnChanges(): void {
        console.log(this.dataTemp);
        this.setData();
    }

    @AsyncRender
    public setData(): void {
        if (this.data) {
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
        // this.data = {
        //     minmax: [],
        //     legend: null,
        //     groups: [
        //         {
        //             title: '',
        //             bars: [
        //                 {
        //                     value: 97.7,
        //                     title: 'Bar title',
        //                     lowLevel: ((80 - minValue) / trueDelta) * 100,
        //                     topLevel: ((97.7 - minValue) / trueDelta) * 100,
        //                     type: IAstueOnpzFactoryAnalysisBarType.Summary,
        //                 },
        //             ],
        //         },
        //         {
        //             title: 'Group title',
        //             bars: [
        //                 {
        //                     value: -7,
        //                     title: 'Bar title 11',
        //                     lowLevel: ((100 - minValue) / trueDelta) * 100,
        //                     topLevel: ((120 - minValue) / trueDelta) * 100,
        //                     type: IAstueOnpzFactoryAnalysisBarType.Deviation,
        //                 },
        //                 {
        //                     value: 10,
        //                     title: 'Bar title 2',
        //                     lowLevel: ((90 - minValue) / trueDelta) * 100,
        //                     topLevel: ((100 - minValue) / trueDelta) * 100,
        //                     type: IAstueOnpzFactoryAnalysisBarType.Normal,
        //                 },
        //             ],
        //         },
        //     ],
        // };
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
