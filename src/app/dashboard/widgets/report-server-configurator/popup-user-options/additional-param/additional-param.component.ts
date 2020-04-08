import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-additional-param',
  templateUrl: './additional-param.component.html',
  styleUrls: ['./additional-param.component.scss']
})
export class AdditionalParamComponent implements OnInit {
  @Input() public data;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  isOpenCheckBlock: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowOptions(item): void {
    item.open = !item.open;
  }

  saveReport() {
    this.close.emit(false);
  }

  closeAdditional() {
    this.close.emit(false);
  }

  openCustomOptions() {
  
  }

}
