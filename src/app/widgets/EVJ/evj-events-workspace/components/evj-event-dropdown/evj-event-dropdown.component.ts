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
    };

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public onSelected(event: MatSelectChange): void {
        this.value = this.valueField ? event.value[this.valueField] : event.value;
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
        if (this.val && this.val.hasOwnProperty('id')) {
            foundedItem = this.list.find(item => item.id === this.val.id);
            // Поддержка кейса когда в списке нет нашего значения мы его добавляем туда
            if (!foundedItem) {
                this.list.push(this.val);
            }
            setTimeout(() => {
                this.value = foundedItem ? foundedItem : this.val;
            })
        }
    }

    private setValue(value: object): void {
        if (value) {
            this.value = this.valueField ? value[this.valueField] : value;
            this.fullObject.emit(value);
        }
    }

    private setDefaultValue(): void {
        if (!this.val && this.initByDefault) {
            setTimeout(() => {
                this.setValue(this.list[0]);
            });
        }
    }

}
