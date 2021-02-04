import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter, forwardRef, Inject,
    Input, OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'evj-mat-select-filter',
    templateUrl: './mat-select-filter.component.html',
    styleUrls: ['./mat-select-filter.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatSelectFilterComponent),
            multi: true
        }
    ],
})
export class MatSelectFilterComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
    @Input()
    public placeholderLabel: string = 'Поиск';

    @Input()
    public disableOptionCentering: boolean = false;

    @Input()
    public noResultFoundText: string = 'Не найдено';

    @ViewChild('filterSelectInput', {read: ElementRef})
    public filterSelectInput: ElementRef;

    public filterOptions: QueryList<MatOption>;

    private overlayClassSet: boolean = false;

    private change: EventEmitter<string> = new EventEmitter<string>();

    private onDestroy: Subject<void> = new Subject<void>();

    private onChange: (_: any) => void = () => null;

    private onTouched: () => void = () => null;

    private filterValue: string;

    get value(): string {
        return this.filterValue;
    }

    constructor(
        @Inject(MatSelect)
        public matSelect: MatSelect,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        // присвоение уникального класса
        const panelClass = 'mat-select-filter-panel';
        if (this.matSelect.panelClass) {
            if (Array.isArray(this.matSelect.panelClass)) {
                this.matSelect.panelClass.push(panelClass);
            } else if (typeof this.matSelect.panelClass === 'string') {
                this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
            } else if (typeof this.matSelect.panelClass === 'object') {
                this.matSelect.panelClass[panelClass] = true;
            }
        } else {
            this.matSelect.panelClass = panelClass;
        }

        this.matSelect.openedChange
            .pipe(takeUntil(this.onDestroy))
            .subscribe((opened) => {
                if (opened) {
                    this.focusFilter();
                } else {
                    this.resetFilter();
                }
            });

        this.matSelect.openedChange
            .pipe(take(1))
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.filterOptions = this.matSelect.options;
                this.filterOptions.changes
                    .pipe(takeUntil(this.onDestroy))
                    .subscribe(() => {
                        const keyManager = this.matSelect._keyManager;
                        if (keyManager && this.matSelect.panelOpen) {
                            // страховка от expression has been changed
                            setTimeout(() => {
                                keyManager.setFirstItemActive();
                            });
                        }
                    });
            });

        this.change
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.changeDetectorRef.detectChanges();
            });
    }

    public ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public ngAfterViewInit(): void {
        if (this.disableOptionCentering) {
            this.setOverlayClass();
        }
    }

    public resetFilter(focus?: boolean): void {
        if (!this.filterSelectInput) {
            return;
        }
        this.filterSelectInput.nativeElement.value = '';
        this.onInput('');
        if (focus) {
            this.focusFilter();
        }
    }

    public writeValue(value: string): void {
        const valueChanged = value !== this.filterValue;
        if (valueChanged) {
            this.filterValue = value;
            this.change.emit(value);
        }
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public onInput(value: string): void {
        const valueChanged = value !== this.filterValue;
        if (valueChanged) {
            this.filterValue = value;
            this.onChange(value);
            this.change.emit(value);
        }
    }

    public onBlur(value: string): void {
        this.writeValue(value);
        this.onTouched();
    }

    // фокус на поле фильтра
    public focusFilter(): void {
        if (!this.filterSelectInput) {
            return;
        }
        const panel = this.matSelect.panel.nativeElement;
        const scrollTop = panel.scrollTop;
        this.filterSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    }

    // присвоение класса оверлею, для корректного расчета offsetY
    private setOverlayClass(): void {
        if (this.overlayClassSet) {
            return;
        }
        const overlayClass = 'cdk-overlay-pane-select-filter';
        // TODO подумать над лучшим решением
        this.matSelect.overlayDir.attach
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.filterSelectInput.nativeElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.classList.add(overlayClass);
            });
        this.overlayClassSet = true;
    }
}
