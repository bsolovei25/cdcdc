import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'evj-user-events-item',
  templateUrl: './user-events-item.component.html',
  styleUrls: ['./user-events-item.component.scss']
})
export class UserEventsItemComponent implements OnInit {

  @Input() icon2: 'smotr' | 'drops' = 'drops';
  @Input() eventStatus: 'default' | 'normal' | 'danger' = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
