import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IPlanItem } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@DecorateUntilDestroy()
@Component({
    selector: 'evj-cmid-event-plan-table',
    templateUrl: './evj-cmid-event-plan-table.component.html',
    styleUrls: ['./evj-cmid-event-plan-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventPlanTableComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    private selectedItems: Set<IPlanItem> = new Set();
    public list: IPlanItem[] = [];
    public selectAllControl: boolean;
    public searchControl: FormControl = new FormControl('');
    private isSearchable: boolean = false;

    @Input()
    public isLoading: boolean;

    @Input()
    public set items(value: IPlanItem[]) {
        if (!this.isSearchable) {
            this.list = value;
            this.resetList();
        } else {
            this.list = this.checkList(value);
        }
        this.isSearchable = false;
    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public initByDefault: boolean = true;

    @Output()
    public onRemoveItem: EventEmitter<IPlanItem> = new EventEmitter<IPlanItem>();

    @Output()
    public onSearch: EventEmitter<string> = new EventEmitter<string>();

    public val: IPlanItem[];

    get value(): IPlanItem[] {
        return this.val;
    }

    set value(val: IPlanItem[]) {
        this.val = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public ngOnInit(): void {
        this.subscriptionOnSearchControl();
    }

    public ngOnChanges(changes: SimpleChanges): void {}

    public ngOnDestroy(): void {}

    public selectItem(item: IPlanItem, status: boolean): void {
        item.selected = status;
        const foundedItem = Array.from(this.selectedItems).find((el) => item.positionId === el.positionId);

        if (foundedItem) {
            item = foundedItem;
        }

        if (status) {
            this.selectedItems.add(item);
        } else {
            this.selectedItems.delete(item);
        }

        this.value = Array.from(this.selectedItems);
    }

    public changeSelectAll(e: MatCheckboxChange): void {
        this.list = this.list.map((item) => ({ ...item, selected: e.checked }));

        if (e.checked) {
            this.selectedItems = new Set(this.list);
        } else {
            this.selectedItems = new Set([]);
        }
        this.value = Array.from(this.selectedItems);
    }

    public removeItem(value: IPlanItem): void {
        this.selectItem(value, false);
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

    public writeValue(obj: IPlanItem[]): void {
        this.val = obj;
    }

    public onChange = (fn: IPlanItem[]) => {};

    public onTouched = () => {};

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private search(value: string): void {
        this.isSearchable = true;
        this.onSearch.emit(value);
    }

    private subscriptionOnSearchControl(): void {
        this.searchControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300), takeUntilDestroyed(this))
            .subscribe((query) => this.search(query));
    }

    private resetList(): void {
        this.selectedItems = new Set();
        this.selectAllControl = false;
        this.value = Array.from(this.selectedItems);
    }

    private checkList(newlist: IPlanItem[]): IPlanItem[] {
        if (newlist) {
            return newlist.map((el) => {
                const foundedElement = Array.from(this.selectedItems).find((item) => item.positionId === el.positionId);
                if (foundedElement) {
                    return { ...el, selected: foundedElement.selected };
                }
                return { ...el };
            });
        }

        return [];
    }
}
