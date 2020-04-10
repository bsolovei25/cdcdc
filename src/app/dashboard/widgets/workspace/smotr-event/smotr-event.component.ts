import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/events-workspace.service';

@Component({
    selector: 'evj-smotr-event',
    templateUrl: './smotr-event.component.html',
    styleUrls: ['./smotr-event.component.scss'],
})
export class SmotrEventComponent implements OnInit {
    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }
}
