import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'evj-cmid-event-plan-table',
    templateUrl: './evj-cmid-event-plan-table.component.html',
    styleUrls: ['./evj-cmid-event-plan-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventPlanTableComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
