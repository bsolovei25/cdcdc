import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-popup-user-options',
  templateUrl: './popup-user-options.component.html',
  styleUrls: ['./popup-user-options.component.scss']
})
export class PopupUserOptionsComponent implements OnInit {
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isOpenNecessaryParam: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeAdditional(event){
    this.close.emit(event);
  }

}
