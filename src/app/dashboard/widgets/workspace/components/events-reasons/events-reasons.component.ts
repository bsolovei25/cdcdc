import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-events-reasons',
    templateUrl: './events-reasons.component.html',
    styleUrls: ['./events-reasons.component.scss'],
})
export class EventsReasonsComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public reasons: string[] = [];

    @Output() private addReason: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public ngOnInit(): void {}

    public onClickAdd(): void {
        this.addReason.emit();
    }
}
