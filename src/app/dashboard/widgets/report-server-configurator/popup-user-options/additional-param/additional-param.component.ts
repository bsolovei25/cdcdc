import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ReportServerConfiguratorService } from 'src/app/dashboard/services/report-server-configurator.service';

@Component({
  selector: 'evj-additional-param',
  templateUrl: './additional-param.component.html',
  styleUrls: ['./additional-param.component.scss']
})
export class AdditionalParamComponent implements OnInit, OnChanges {
  @Input() public data;
  @Input() public options;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public openOptions: EventEmitter<boolean> = new EventEmitter<boolean>();

  objectKeys = Object.keys;

  isOpenCheckBlock: boolean = false;
  public templateId: number;

  public datas: any = [];
  public optionsChoose: any = [];


  optionsName = {
    description: "Описание",
    type: "Тип",
    validationRule: "Правило проверки",
    isRequired: "Обязательный",
    "source": "Источник",
    sortOrder: "Сортировка",
  }

  constructor(
    public reportService: ReportServerConfiguratorService,
    private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cdRef.detectChanges();
    this.datas = this.data.customOptions;
    this.templateId = this.data.id;
    if(this.options.length > 0){
      this.optionsChoose = this.options;
    } else {
      this.optionsChoose = this.data.customOptions;
    }
  }


  onShowOptions(item): void {
    item.open = !item.open;
  }

  saveReport() {
    this.reportService.postCustomOptions(this.templateId, this.optionsChoose).subscribe(ans => {
      this.close.emit(false);
    });
  }

  closeAdditional() {
    this.close.emit(false);
  }

  openCustomOptions() {
    this.openOptions.emit(true);
  }

}
