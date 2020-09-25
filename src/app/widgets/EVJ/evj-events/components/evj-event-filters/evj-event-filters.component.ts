import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IPriority, IUnitEvents } from '../../../../../dashboard/models/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/events-workspace.service';

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

    constructor(private eventService: EventService,
                public ewService: EventsWorkspaceService) {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe(value => {
            this.search.emit(value);
        });
        // this.loadData();
        this.searchControl.valueChanges.subscribe(value => {
            // this.eventService.getEventsFilter(null, null, null, value);
        });
    }

    resetFilters(): void {
        this.unitsSelect.setValue(null);
        this.prioritySelect.setValue(null);
    }

    public onUnitsSelect(event: MatSelectChange): void {
        // this.eventService.getEventsFilter(null, null, null, value);
    }

    public onPrioritySelect(event: MatSelectChange): void {
    }

    async loadData(): Promise<void> {
        this.units = await this.eventService.getUnits();
        this.priority = await this.eventService.getPriority();
    }

}
