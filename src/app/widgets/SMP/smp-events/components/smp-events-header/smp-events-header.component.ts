import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { ISmpEventStatus } from '../../../../../dashboard/models/SMP/smp-events.model';

@Component({
    selector: 'evj-smp-events-header',
    templateUrl: './smp-events-header.component.html',
    styleUrls: ['./smp-events-header.component.scss'],
})
export class SmpEventsHeaderComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public stats: ISmpEventStatus[] = [];
    @Output() private changeStatus: EventEmitter<number> = new EventEmitter<number>();

    public select: SelectionModel<ISmpEventStatus> = new SelectionModel<ISmpEventStatus>();

    private subscription: Subscription[] = [];

    constructor() {}

    public ngOnChanges(): void {
        this.select.select(this.stats[0]);
    }

    public ngOnInit(): void {
        this.subscription.push(
            this.select.changed.subscribe((data) => {
                this.changeStatus.emit(+data.added[0].status.id);
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
