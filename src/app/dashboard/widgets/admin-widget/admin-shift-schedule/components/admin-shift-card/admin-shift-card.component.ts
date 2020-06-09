import { Component, Input } from '@angular/core';

@Component({
    selector: 'evj-admin-shift-card',
    templateUrl: './admin-shift-card.component.html',
    styleUrls: ['./admin-shift-card.component.scss'],
})
export class AdminShiftCardComponent {
    @Input() title: string = '';
    constructor() {}
}
