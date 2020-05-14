import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-production-deviations-diagram',
    templateUrl: './production-deviations-diagram.component.html',
    styleUrls: ['./production-deviations-diagram.component.scss'],
})
export class ProductionDeviationsDiagramComponent implements OnInit {
    @Input() public isBaseline: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
