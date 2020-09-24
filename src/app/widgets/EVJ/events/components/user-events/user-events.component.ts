import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'evj-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.onClose.emit(false);
  }

}
