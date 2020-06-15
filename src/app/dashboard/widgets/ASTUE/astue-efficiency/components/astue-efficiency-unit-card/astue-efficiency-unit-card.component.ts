import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-astue-efficiency-unit-card',
    templateUrl: './astue-efficiency-unit-card.component.html',
    styleUrls: ['./astue-efficiency-unit-card.component.scss'],
})
export class AstueEfficiencyUnitCardComponent implements OnInit {
    public isClicked: boolean = false;
    public isOpen: boolean = false;

    constructor() {}

    public ngOnInit(): void {}
}
