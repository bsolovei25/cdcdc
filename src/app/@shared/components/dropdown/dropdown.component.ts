import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, Optional, Self } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IMenuItem } from '@widgets/EVJ/evj-events-workspace/components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component';

@Component({
    selector: 'evj-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements ControlValueAccessor {
    @Input() placeholder: string;

    @Input() public items: { id: number; value: string }[] = [
        {
            id: 0,
            value: 'Да',
        },
        {
            id: 1,
            value: 'Нет',
        },
    ];
    public val: any;
    public disabled: boolean = false;
    public selectedValue = this.items[0];

    get value(): IMenuItem[] {
        return this.val;
    }

    set value(val: IMenuItem[]) {
        this.val = val;
        this.onChange(this.val);
        this.onTouched();
    }

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public changeValue(): void {
        this.onChange(this.val);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    changeUnit(event: MatSelectChange) {
        console.log(event);
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(obj: IMenuItem[]): void {
        this.val = obj;
    }

    public onChange = (fn: IMenuItem[]) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public compareFn(a, b): boolean {
        return a?.id === b?.id;
    }
}
