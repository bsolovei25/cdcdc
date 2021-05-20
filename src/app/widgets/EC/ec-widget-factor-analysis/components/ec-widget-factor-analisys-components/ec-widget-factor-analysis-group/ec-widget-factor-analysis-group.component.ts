import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzFactoryAnalysisGroup } from '../../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

@Component({
    selector: 'evj-ec-widget-factor-analysis-group',
    templateUrl: './ec-widget-factor-analysis-group.component.html',
    styleUrls: ['./ec-widget-factor-analysis-group.component.scss'],
})
export class EcWidgetFactorAnalysisGroupComponent implements OnInit {
    @Input() data: IAstueOnpzFactoryAnalysisGroup = null;

    constructor() {}

    ngOnInit(): void {}
}
