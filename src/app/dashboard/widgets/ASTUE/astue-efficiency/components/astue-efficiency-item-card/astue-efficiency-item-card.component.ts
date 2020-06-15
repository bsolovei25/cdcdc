import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-astue-efficiency-item-card',
    templateUrl: './astue-efficiency-item-card.component.html',
    styleUrls: ['./astue-efficiency-item-card.component.scss'],
})
export class AstueEfficiencyItemCardComponent implements OnInit {
    @Input() public isActive: boolean = false;

    constructor() {}

    public ngOnInit(): void {}
}
