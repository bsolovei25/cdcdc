import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'evj-kpe-charts-analytic-header-toggle',
    templateUrl: './kpe-charts-analytic-header-toggle.component.html',
    styleUrls: ['./kpe-charts-analytic-header-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeChartsAnalyticHeaderToggleComponent implements OnInit {
    @Input() formGroup: FormGroup;

    constructor() {}

    ngOnInit(): void {}
}
