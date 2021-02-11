import { Component, OnInit, Input } from '@angular/core';
import { IPerfProgPark } from '../../../../../dashboard/models/SMP/performance-progress-indicators.model';

@Component({
    selector: 'evj-performance-progress-park',
    templateUrl: './performance-progress-park.component.html',
    styleUrls: ['./performance-progress-park.component.scss'],
})
export class PerformanceProgressParkComponent implements OnInit {
    @Input() title: string;
    @Input() data: IPerfProgPark;

    constructor() {}

    ngOnInit(): void {}
}
