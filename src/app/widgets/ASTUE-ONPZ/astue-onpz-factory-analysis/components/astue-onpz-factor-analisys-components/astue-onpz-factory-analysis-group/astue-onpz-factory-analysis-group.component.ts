import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzFactoryAnalysisGroup } from '../../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-group',
    templateUrl: './astue-onpz-factory-analysis-group.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-group.component.scss'],
})
export class AstueOnpzFactoryAnalysisGroupComponent implements OnInit {
    @Input() data: IAstueOnpzFactoryAnalysisGroup = null;

    constructor() {}

    ngOnInit(): void {}
}
