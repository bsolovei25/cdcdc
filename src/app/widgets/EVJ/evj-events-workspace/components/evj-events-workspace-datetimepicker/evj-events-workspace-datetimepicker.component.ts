import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-events-workspace-datetimepicker',
    templateUrl: './evj-events-workspace-datetimepicker.component.html',
    styleUrls: ['./evj-events-workspace-datetimepicker.component.scss'],
})
export class EvjEventsWorkspaceDatetimepickerComponent implements OnInit {
    @Input()
    public date: Date = new Date();

    @Input()
    public label: string = 'Срок выполнения';

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
