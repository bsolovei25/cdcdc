import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'evj-evj-main-toggle',
  templateUrl: './evj-main-toggle.component.html',
  styleUrls: ['./evj-main-toggle.component.scss']
})
export class EvjMainToggleComponent implements OnInit {
    @Output() eventCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() eventBack: EventEmitter<null> = new EventEmitter<null>();
    @Output() public eventProdTaskChange: EventEmitter<void> = new EventEmitter<void>();
    @Input() blockWorkspaceButton: boolean;
    @Input() eventProdTask: string;
    public createIcon: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
    public createEvent(event: boolean): void {
        this.createIcon = false;
        this.blockWorkspaceButton = true;
        this.eventCreated.emit(event);
    }

    public changeStatus(): void {
        this.eventProdTaskChange.emit();
    }

    public backEvent(): void {
        this.eventBack.emit();
    }
}
