import { Component, EventEmitter, Input, OnChanges, Optional, Output, Self, SimpleChanges } from "@angular/core";
import { IMenuItem } from "@widgets/EVJ/evj-events-workspace/components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
  selector: 'evj-events-smpo-events',
  templateUrl: './evj-events-smpo-correct.component.html',
  styleUrls: ['./evj-events-smpo-correct.component.scss']
})
export class EvjEventsSmpoCorrectComponent implements ControlValueAccessor, OnChanges {
    @Input() items: IMenuItem[] = [];
    @Output() onRemoveItem: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

    public val: IMenuItem[];

    @Output()
    public selected: EventEmitter<string> = new EventEmitter();

    @Input()
    public disabled: boolean = false;

    @Input()
    public initByDefault: boolean = true;

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    get value(): IMenuItem[] {
        return this.val;
    }

    set value(val: IMenuItem[]) {
        this.val = val;
        this.items = this.val;
        this.onChange(this.items);
        this.onTouched();
    }

    public removeItem(value: IMenuItem): void {
        this.onRemoveItem.emit(value);
    }

    public clear(): void {
        this.ngControl.control.setValue(null);
    }

    public changeValue(): void {
        this.onChange(this.val);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(obj: IMenuItem[]): void {
        this.val = obj;
        this.items = obj;
    }

    public onChange = (fn: IMenuItem[]) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

}
