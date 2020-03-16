import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
})
export class TimeDataPickerComponent implements OnInit {
    @Input() data: Date;

    constructor() {}

    ngOnInit(): void {}
}
