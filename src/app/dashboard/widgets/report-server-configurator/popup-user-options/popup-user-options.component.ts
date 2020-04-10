import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'evj-popup-user-options',
  templateUrl: './popup-user-options.component.html',
  styleUrls: ['./popup-user-options.component.scss']
})
export class PopupUserOptionsComponent implements OnInit, OnChanges {
  @Input() public data;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isOpenNecessaryParam: boolean = false;

  options: any = [];
  customOptionsActive: any = [];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
 //   this.cdRef.detectChanges();
    this.customOptionsActive = this.data;
  }


  closeAdditional(event) {
    this.close.emit(event);
  }

  openOptions(event) {
    this.isOpenNecessaryParam = event;
  }

  chooseOptions(event) {
    this.isOpenNecessaryParam = event.close;
    this.options = event.array;
  }



}
