import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
    selector: 'evj-smpo-event-datetimepicker',
    templateUrl: './evj-smpo-event-datetimepicker.component.html',
    styleUrls: ['./evj-smpo-event-datetimepicker.component.scss'],
})
export class EvjSmpoEventDatetimepickerComponent implements ControlValueAccessor, OnInit {
    @Input()
    public date: Date | string = new Date();

    @Input()
    public label: string = 'Срок выполнения';

    @Input()
    public disabled: boolean = false;

    @Output()
    public onValueChange: EventEmitter<string | Date> = new EventEmitter<string | Date>();

    public isDisable: boolean;

    get value(): string | Date {
        return this.date;
    }

    set value(val: string | Date) {
        this.date = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }


    public ngOnInit(): void {}

    public onClick(): void {}

    public dateTimePickerInputStart(value: string | Date): void {
        this.onValueChange.emit(value);
        this.value = value;
        this.writeValue(value);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(obj: Date | string): void {
        this.date = obj;
    }

    public onChange = (fn: string | Date) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.isDisable = isDisabled;
    }
}
