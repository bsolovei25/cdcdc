import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'evj-events-reasons-single',
  templateUrl: './evj-events-reasons-single.component.html',
  styleUrls: ['./evj-events-reasons-single.component.scss']
})
export class EvjEventsReasonsSingleComponent implements OnInit {
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
