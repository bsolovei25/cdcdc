import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';

@Component({
    selector: 'evj-event-description',
    templateUrl: './event-description.component.html',
    styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit, AfterViewInit {
    @Input() public isRetrievalEvent: boolean = false;

    @ViewChild('textarea') private textarea: ElementRef;

    public eventKey: 'event' | 'retrievalEvent';

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.eventKey = this.isRetrievalEvent ? 'retrievalEvent' : 'event';
    }

    public ngAfterViewInit(): void {
        this.disableTextarea();
    }

    public onEditShortInfo(): void {
        this.textarea.nativeElement.disabled = false;
        this.textarea.nativeElement.focus();
    }

    public disableTextarea(): void {
        this.textarea.nativeElement.disabled = true;
    }
}
