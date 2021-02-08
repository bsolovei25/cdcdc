import { IImplementationPlan } from './../../../../../dashboard/models/SMP/implementation-plan.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-implementations',
    templateUrl: './implementations.component.html',
    styleUrls: ['./implementations.component.scss'],
})
export class ImplementationsComponent implements OnInit {
    @Input() data: IImplementationPlan;
    constructor() {}

    ngOnInit(): void {}
}
