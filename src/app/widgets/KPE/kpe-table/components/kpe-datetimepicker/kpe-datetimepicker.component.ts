import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-kpe-datetimepicker',
    templateUrl: './kpe-datetimepicker.component.html',
    styleUrls: ['./kpe-datetimepicker.component.scss'],
})
export class KpeDatetimepickerComponent implements OnInit {
    @Input()
    public date: Date = new Date();

    @Input()
    public disabled: boolean = false;

    @Output()
    public onValueChange: EventEmitter<string | Date> = new EventEmitter<string | Date>();

    constructor() {}

    public ngOnInit(): void {}

    public onClick(): void {}

    public dateTimePickerInputStart(value: string | Date): void {
        this.onValueChange.emit(value);
    }
}
