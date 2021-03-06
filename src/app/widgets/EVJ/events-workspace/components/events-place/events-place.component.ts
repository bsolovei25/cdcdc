import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUnitEvents } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-events-place',
    templateUrl: './events-place.component.html',
    styleUrls: ['./events-place.component.scss'],
})
export class EventsPlaceComponent implements OnInit {
    @Input() private isRetrieval: boolean = false;
    @Input() public disabled: boolean = false;

    filter: FormControl = new FormControl({ value: '', disabled: true });

    public unit: number = null;

    private onDestroy: Subject<void> = new Subject<void>();

    public units: IUnitEvents[];

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.ewService.event$.pipe(takeUntil(this.onDestroy)).subscribe((event) => {
            this.unit = event?.unit?.id;
        });
        this.filter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.filterPlace();
        });
        this.clearFilter();
    }

    public chooseUnit(data: IUnitEvents): void {
        this.ewService.event.unit = data;
    }

    public clearFilter(): void {
        this.filter.setValue('');
    }

    private filterPlace(): void {
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
