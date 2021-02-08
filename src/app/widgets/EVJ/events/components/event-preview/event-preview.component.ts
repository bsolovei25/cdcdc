import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventService } from '../../../../../dashboard/services/widgets/EVJ/event.service';

@Component({
    selector: 'evj-event-preview',
    templateUrl: './event-preview.component.html',
    styleUrls: ['./event-preview.component.scss'],
})
export class EventPreviewComponent implements OnInit, OnDestroy {
    @Input()
    public isPreviewOpened: boolean = false;

    @Output()
    public close: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {}

    public onClose(): void {
        this.close.emit();
    }
}
