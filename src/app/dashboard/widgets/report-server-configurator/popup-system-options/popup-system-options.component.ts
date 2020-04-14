import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-popup-system-options',
  templateUrl: './popup-system-options.component.html',
  styleUrls: ['./popup-system-options.component.scss']
})
export class PopupSystemOptionsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() optionsType: string;

  constructor() { }

  ngOnInit(): void {
  }

  resultPopup(event) {
    this.optionsType = null;
    this.close.emit(false);
    console.log(event);
  }

}
