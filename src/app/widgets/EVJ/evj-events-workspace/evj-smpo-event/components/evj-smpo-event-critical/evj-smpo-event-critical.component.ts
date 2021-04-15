import { Component, ChangeDetectionStrategy, SimpleChanges, Optional, OnChanges, Self, HostListener } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
  selector: 'evj-smpo-event-critical',
  templateUrl: './evj-smpo-event-critical.component.html',
  styleUrls: ['./evj-smpo-event-critical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvjSmpoEventCriticalComponent implements OnChanges, ControlValueAccessor {
    public val: boolean = false;
    public disabled: boolean = false;

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    get value(): boolean {
        return this.val;
    }

    set value(val: boolean) {
        this.val = val;
        this.onChange(val);
        this.onTouched();
    }

    public clear(): void {
        this.ngControl.control.setValue(null);
    }

    public onEnter(): void {
        this.onChange(this.val);
    }

    public changeValue(): void {
        this.onChange(this.val);
    }

    public ngOnChanges(changes: SimpleChanges): void {}

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(obj: boolean): void {
        this.val = obj;
    }

    public onChange = (fn: boolean) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
