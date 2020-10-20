import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IPriority, IUnitEvents } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/events-workspace.service';
import { IUnits } from '../../../../../dashboard/models/ADMIN/admin-shift-schedule';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'evj-evj-event-filters',
    templateUrl: './evj-event-filters.component.html',
    styleUrls: ['./evj-event-filters.component.scss']
})
export class EvjEventFiltersComponent implements OnInit {

    public unitsSelect: FormControl = new FormControl();
    public prioritySelect: FormControl = new FormControl();
    searchControl: FormControl = new FormControl();
    units: IUnitEvents[] = [];
    priority: IPriority[] = [];

    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() outUnits: EventEmitter<IUnits> = new EventEmitter<IUnits>();
    @Output() outPriority: EventEmitter<IPriority> = new EventEmitter<IPriority>();
    @Output() description: EventEmitter<string> = new EventEmitter<string>();

    constructor(private eventService: EventService,
                public ewService: EventsWorkspaceService) {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe(value => {
            this.search.emit(value);
        });
        this.searchControl.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged())
            .subscribe(value => {
                this.description.emit(value);
            });
        this.loadData();
    }

    resetFilters(): void {
        this.unitsSelect.setValue(null);
        this.prioritySelect.setValue(null);
        this.outUnits.emit(null);
        this.outPriority.emit(null);
    }

    public onUnitsSelect(event: MatSelectChange): void {
        this.outUnits.emit(event.value);
    }

    public onPrioritySelect(event: MatSelectChange): void {
        this.outPriority.emit(event.value);
    }

    async loadData(): Promise<void> {
        this.units = await this.eventService.getUnits();
        this.priority = await this.eventService.getPriority();
    }

}
