import { Component, OnInit, Input } from '@angular/core';
import { IPerfProgCircle } from '../../../../../dashboard/models/SMP/performance-progress-indicators.model';

@Component({
    selector: 'evj-performance-progress-line-circle',
    templateUrl: './performance-progress-line-circle.component.html',
    styleUrls: ['./performance-progress-line-circle.component.scss'],
})
export class PerformanceProgressLineCircleComponent implements OnInit {
    @Input() public data: IPerfProgCircle[];

    constructor() {}

    ngOnInit(): void {}
}
