import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IPriority, IUnitEvents } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/EVJ/event.service';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IUnits } from '../../../../../dashboard/models/ADMIN/admin-shift-schedule';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'evj-evj-event-filters',
    templateUrl: './evj-event-filters.component.html',
    styleUrls: ['./evj-event-filters.component.scss'],
})
export class EvjEventFiltersComponent implements OnInit {
    public unitsSelect: FormControl = new FormControl();
    public prioritySelect: FormControl = new FormControl();
    searchControl: FormControl = new FormControl();
    units: IUnitEvents[] = [];
    priority: IPriority[] = [];
    filter: FormControl = new FormControl({ value: '', disabled: true });
    private onDestroy: Subject<void> = new Subject<void>();

    @Input() set inputUnits(values: IUnits[]) {
        if (!!this.unitsSelect.value) {
            return;
        }
        const preselectedValues = values.map((item) => item.id);
        this.unitsSelect.setValue(preselectedValues);
    }
    @Input() set inputPriority(value: IPriority) {
        if (!!this.prioritySelect.value) {
            return;
        }
        this.prioritySelect.setValue(value?.id);
    }
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() outUnits: EventEmitter<IUnits[]> = new EventEmitter<IUnits[]>();
    @Output() outPriority: EventEmitter<IPriority> = new EventEmitter<IPriority>();
    @Output() description: EventEmitter<string> = new EventEmitter<string>();

    constructor(private eventService: EventService, public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe((value) => {
            this.search.emit(value);
        });
        this.searchControl.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((value) => {
            this.description.emit(value);
        });
        this.loadData();
        this.filter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.filterPlant();
        });
    }

    resetFilters(): void {
        this.unitsSelect.setValue(null);
        this.prioritySelect.setValue(null);
        this.outUnits.emit(null);
        this.outPriority.emit(null);
    }

    public onUnitsSelect(event: MatSelectChange): void {
        if (!this.units?.length) {
            return;
        }
        this.outUnits.emit((this.units?.filter((item) => event.value.includes(item.id)) as IUnits[]) ?? null);
    }

    public onPrioritySelect(event: MatSelectChange): void {
        if (!this.priority?.length) {
            return;
        }
        this.outPriority.emit(this.priority?.find((x) => event.value === x.id) ?? null);
    }

    async loadData(): Promise<void> {
        this.units = await this.eventService.getUnits();
        this.priority = await this.eventService.getPriority();
    }
    public clearFilter(): void {
        this.filter.setValue('');
    }
    private filterPlant(): void {
        if (!this.ewService.units) {
            return;
        }
        let value = this.filter.value.trim();
        if (!value || value === '') {
            this.units = this.ewService.units;
            return;
        } else {
            value = value.toLowerCase();
        }
        this.units = this.ewService.units.filter((unit) => unit.name.toLowerCase().indexOf(value) > -1);
    }
}
