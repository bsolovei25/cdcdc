import { Component, Input, OnInit } from '@angular/core';

interface IAstueOnpzInteractiveIndicators {
    labels: { name: string, icon: string };
    indicators: { name: string, value: number };
    allIndicators: { name: string, icon: string };
}

@Component({
    selector: 'evj-astue-onpz-interactive-indicators',
    templateUrl: './astue-onpz-interactive-indicators.component.html',
    styleUrls: ['./astue-onpz-interactive-indicators.component.scss']
})
export class AstueOnpzInteractiveIndicatorsComponent implements OnInit {

    @Input() data: IAstueOnpzInteractiveIndicators[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
