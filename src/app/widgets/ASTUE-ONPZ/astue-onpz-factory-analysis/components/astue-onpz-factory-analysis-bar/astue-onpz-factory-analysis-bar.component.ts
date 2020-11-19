import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzFactoryAnalysisBar } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-bar',
    templateUrl: './astue-onpz-factory-analysis-bar.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzFactoryAnalysisBarComponent implements OnInit {
    @Input() set data(value: IAstueOnpzFactoryAnalysisBar) {
        this.barStyle = `top: ${100 - value.topLevel}%; bottom: ${value.lowLevel}%;`;
        this.barClass = value.type;
        this.value = value.value;
    }
    public barStyle: string = null;
    public barClass: string = null;
    public value: number = null;

    constructor() {}

    ngOnInit(): void {}
}
