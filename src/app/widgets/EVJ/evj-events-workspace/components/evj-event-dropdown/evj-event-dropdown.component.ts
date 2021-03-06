import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Optional,
    Output,
    Self,
    SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'evj-event-dropdown',
    templateUrl: './evj-event-dropdown.component.html',
    styleUrls: ['./evj-event-dropdown.component.scss'],
})
export class EvjEventDropdownComponent implements OnChanges, ControlValueAccessor {
    public val: any;
    public list: Record<string, any> = [];
    @Output()
    public selected: EventEmitter<string> = new EventEmitter();

    @Output()
    public fullObject: EventEmitter<any> = new EventEmitter();

    @Input()
    public selectedFirst: boolean = true;

    @Input()
    public disabled: boolean = false;

    @Input()
    public fieldName: string;

    @Input()
    public valueField: string;

    @Input()
    public initByDefault: boolean = true;

    @Input()
    public set items(value: Record<string, unknown>[]) {
        this.list = value;
        this.initValue();
    }

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public onSelected(event: MatSelectChange): void {
        this.value = event.value;
        this.setValue(event.value);
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
        this.initValue();
    }

    public onChange = (fn: string) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private initValue(): void {
        let foundedItem;
        if (this.val && typeof this.val === 'string' && this.list) {
            foundedItem = this.list.find((item) => item.id === this.val);

            setTimeout(() => {
                this.value = foundedItem ? foundedItem[this.valueField] : this.val;
            });
            return;
        }
        if (this.val && this.val.hasOwnProperty('id') && this.list) {
            foundedItem = this.list.find((item) => item.id === this.val.id);
            setTimeout(() => {
                this.value = foundedItem ? foundedItem : this.val;
            });
            return;
        }
        if (!this.val && this.list) {
            setTimeout(() => {
                this.value = this.valueField ? this.list[0][this.valueField] : this.list[0];
            }, 100);
        }
    }

    private setValue(value: any): void {
        if (value) {
            this.value = value;
            this.fullObject.emit(value);
        }
    }

    private setDefaultValue(): void {
        if (!this.val && this.initByDefault && this.list) {
            setTimeout(() => {
                this.setValue(this.list[0]);
            });
        }
    }
}
