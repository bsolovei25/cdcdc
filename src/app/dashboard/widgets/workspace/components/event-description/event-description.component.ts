import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-event-description',
    templateUrl: './event-description.component.html',
    styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit, AfterViewInit {
    @Input() public description: string = '';
    @Input() public isRetrievalEvent: boolean = false;

    @Output() private changedDescription: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('textarea') private textarea: ElementRef;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

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

    public onChangeTextarea(): void {
        this.changedDescription.emit(this.description);
    }
}
