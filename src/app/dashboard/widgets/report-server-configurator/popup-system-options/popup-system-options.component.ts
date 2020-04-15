import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-popup-system-options',
  templateUrl: './popup-system-options.component.html',
  styleUrls: ['./popup-system-options.component.scss']
})
export class PopupSystemOptionsComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() optionsType: any;

  constructor() { }

  ngOnInit(): void {
  }

  resultPopup(event) {
    const systemCustomOptionsId = this.optionsType.id;
    const obj = {
      close: event.close,
      systemIdChange: systemCustomOptionsId,
    }
    this.optionsType = null;
    this.close.emit(obj);
  }

}
