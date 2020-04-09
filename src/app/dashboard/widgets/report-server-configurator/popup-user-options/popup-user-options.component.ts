import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'evj-popup-user-options',
  templateUrl: './popup-user-options.component.html',
  styleUrls: ['./popup-user-options.component.scss']
})
export class PopupUserOptionsComponent implements OnInit {
  @Input() public data;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isOpenNecessaryParam: boolean = false;

  options: any = [];
  customOptionsActive: any = [];

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {
    console.log(this.data);
    if (this.data === null || this.data === undefined) {
      this.customOptionsActive = this.data;
    }
  }


  closeAdditional(event) {
    this.close.emit(event);
  }

  closeNecessary(event) {
    this.isOpenNecessaryParam = event;
  }

  openOptions(event) {
    this.isOpenNecessaryParam = event;
  }

  chooseOptions(event) {
    this.options = event;
  }



}
