import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-popup-system-options',
  templateUrl: './popup-system-options.component.html',
  styleUrls: ['./popup-system-options.component.scss']
})
export class PopupSystemOptionsComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() optionsType: any;

  public systemOptions: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    switch (this.optionsType.templateSystemOption.systemOptionType) {
      case 'autogenerate':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      case 'pathEdit':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      case 'macroEdit':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      case 'reportSheets':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      case 'parameterValuesAutogeneration':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      case 'periodEdit':
        this.systemOptions = this.optionsType.templateSystemOption.systemOptionType;
        break;
      default:
        const obj = {
          close: false,
          type: this.optionsType.templateSystemOption.systemOptionType,
        }
        this.resultPopup(obj);
    }
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
