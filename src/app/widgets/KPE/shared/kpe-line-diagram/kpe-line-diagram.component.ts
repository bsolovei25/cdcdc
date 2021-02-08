import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'evj-kpe-line-diagram',
    templateUrl: './kpe-line-diagram.component.html',
    styleUrls: ['./kpe-line-diagram.component.scss'],
})
export class KpeLineDiagramComponent implements OnInit, OnChanges {
    @Input()
    public plan: number = 100;

    @Input()
    public fact: number = 100;

    @Input()
    public deviation: number = 100;

    percentDeviation: number;
    percentFact: number;
    percentPlan: number;
    switchBtn: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.percentDeviation = this.fact - this.plan;
        if (this.percentDeviation > 0) {
            this.percentFact = (this.plan / this.fact) * 100;
            this.percentPlan = 100 - this.percentFact;
        } else {
            this.percentFact = (this.fact / this.plan) * 100;
            this.percentPlan = 100 - this.percentFact;
        }
    }
}
