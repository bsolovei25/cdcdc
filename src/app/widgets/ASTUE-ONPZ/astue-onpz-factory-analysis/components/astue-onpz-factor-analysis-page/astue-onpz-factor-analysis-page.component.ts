import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarType,
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-astue-onpz-factor-analysis-page',
    templateUrl: './astue-onpz-factor-analysis-page.component.html',
    styleUrls: ['./astue-onpz-factor-analysis-page.component.scss'],
})
export class AstueOnpzFactorAnalysisPageComponent implements OnInit {
    @ViewChild('grid') gridContainerRef: ElementRef;

    private readonly infoPaddingPx: number = 13;
    public legendValues$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

    @Input() public data: IAstueOnpzFactoryAnalysis = null;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnInit(): void {
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
                            title: 'Bar title 11',
                            lowLevel: ((100 - minValue) / trueDelta) * 100,
                            topLevel: ((120 - minValue) / trueDelta) * 100,
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
