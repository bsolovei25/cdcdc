import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-kpe-line-diagram',
    templateUrl: './kpe-line-diagram.component.html',
    styleUrls: ['./kpe-line-diagram.component.scss']
})
export class KpeLineDiagramComponent implements OnInit {

    @Input() data: { plan: number, fact: number };
    percentDeviation: number;
    percentFact: number;
    percentPlan: number;
    switchBtn: boolean = true;

    constructor() {
    }

    ngOnInit(): void {
        this.percentDeviation = this.data.fact - this.data.plan;
        if (this.percentDeviation > 0) {
            this.percentFact = this.data.plan / this.data.fact * 100;
            this.percentPlan = 100 - this.percentFact;
        } else {
            this.percentFact = this.data.fact / this.data.plan * 100;
            this.percentPlan = 100 - this.percentFact;
        }

    }


}
