import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Optional,
    Output,
    Self,
    SimpleChanges
} from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";

@Component({
    selector: 'evj-event-dropdown',
    templateUrl: './evj-event-dropdown.component.html',
    styleUrls: ['./evj-event-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjEventDropdownComponent implements OnChanges, ControlValueAccessor {
    public val: string;

    @Output()
    public selected: EventEmitter<string> = new EventEmitter();

    @Input()
    public disabled: boolean = false;

    @Input()
    public initByDefault: boolean = true;

    @Input()
    public items: string[] = [];

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public onSelected(event: MatSelectChange): void {
        this.value = event.value;
    }

    get value(): string {
        return this.val;
    }

    set value(val: string) {
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

    public ngOnChanges(changes: SimpleChanges): void {
        this.setDefaultValue();
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(obj: string): void {
        this.val = obj;
    }

    public onChange = (fn: string) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private setDefaultValue(): void {
        if (!this.val && this.initByDefault) {
            setTimeout(() => {
                this.value = this.items[0];
            });
        }
    }

}
