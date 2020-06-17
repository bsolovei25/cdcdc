import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-astue-efficiency-table-display',
    templateUrl: './astue-efficiency-table-display.component.html',
    styleUrls: ['./astue-efficiency-table-display.component.scss'],
})
export class AstueEfficiencyTableDisplayComponent implements OnInit {
    @Output() private toggleDisplay: EventEmitter<true> = new EventEmitter<true>();

    constructor() {}

    public ngOnInit(): void {}

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(true);
    }
}
