import { Component, Input } from '@angular/core';

@Component({
    selector: 'evj-admin-shift-card-old',
    templateUrl: './admin-shift-card-old.component.html',
    styleUrls: ['./admin-shift-card-old.component.scss'],
})
export class AdminShiftCardOldComponent {
    @Input() titleBlock: string = '';
    constructor() {}
}
