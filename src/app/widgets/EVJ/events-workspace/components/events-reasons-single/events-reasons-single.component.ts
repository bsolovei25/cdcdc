import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-events-reasons-single',
    templateUrl: './events-reasons-single.component.html',
    styleUrls: ['./events-reasons-single.component.scss'],
})
export class EventsReasonsSingleComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public reason: string = '';
    @Input() public isAdder: boolean = true;
    @Output() private addReason: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public ngOnInit(): void {}

    public onClickAdd(): void {
        this.addReason.emit();
    }
}
