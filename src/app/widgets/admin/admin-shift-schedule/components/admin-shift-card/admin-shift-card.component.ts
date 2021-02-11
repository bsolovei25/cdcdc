import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-admin-shift-card',
    templateUrl: './admin-shift-card.component.html',
    styleUrls: ['./admin-shift-card.component.scss'],
})
export class AdminShiftCardComponent {
    @Input() titleBlock: string = '';
    @Input() buttonLeft: string = '';
    @Input() buttonRight: string = '';

    @Output() clickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    isLeftActive: boolean = true;
    constructor() {}

    onBtnClick(isLeftActive: boolean): void {
        this.isLeftActive = isLeftActive ? true : false;
        this.clickEvent.emit(this.isLeftActive);
    }
}
