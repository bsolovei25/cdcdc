import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-header',
    templateUrl: './astue-onpz-factory-analysis-header.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-header.component.scss'],
})
export class AstueOnpzFactoryAnalysisHeaderComponent implements OnInit {
    @Input() page: 'bar' | 'chart' = null;
    @Output() changePage: EventEmitter<'bar' | 'chart'> = new EventEmitter<'bar' | 'chart'>();

    constructor() {}

    ngOnInit(): void {}
}
