import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventService } from '../../../../../dashboard/services/widgets/EVJ/event.service';

@Component({
    selector: 'evj-evj-event-preview',
    templateUrl: './evj-event-preview.component.html',
    styleUrls: ['./evj-event-preview.component.scss']
})
export class EvjEventPreviewComponent implements OnInit, OnDestroy {
    @Input()
    public isPreviewOpened: boolean = false;

    @Output()
    public close: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public onClose(): void {
        this.close.emit();
    }
}
