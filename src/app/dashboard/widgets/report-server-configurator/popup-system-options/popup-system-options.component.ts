import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ISystemOptionsTemplate } from 'src/app/dashboard/models/report-server';

@Component({
  selector: 'evj-popup-system-options',
  templateUrl: './popup-system-options.component.html',
  styleUrls: ['./popup-system-options.component.scss']
})
export class PopupSystemOptionsComponent implements OnInit, OnChanges {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() optionsType: ISystemOptionsTemplate;
  @Input() templateData: any;

  public systemOptions: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
  }


  resultPopup(event): void {
    const systemCustomOptionsId = this.optionsType.id;
    const obj = {
      close: event.close,
      systemIdChange: systemCustomOptionsId,
    };

    this.optionsType = null;
    this.close.emit(obj);
  }

}
