import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { ReportServerConfiguratorService } from 'src/app/dashboard/services/widgets/admin-panel/report-server-configurator.service';

@Component({
  selector: 'evj-additional-param',
  templateUrl: './additional-param.component.html',
  styleUrls: ['./additional-param.component.scss'],
  animations: [
    trigger('Branch', [
      state(
        'collapsed',
        style({
          height: 0,
          transform: 'translateY(-8px)',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('collapsed => expanded', animate('150ms ease-in')),
      transition('expanded => collapsed', animate('150ms ease-out')),
    ]),
  ],
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
    description: 'Описание',
    type: 'Тип',
    validationRule: 'Правило проверки',
    isRequired: 'Обязательный',
    source: 'Источник',
    sortOrder: 'Сортировка',
  };

  constructor(
    public reportService: ReportServerConfiguratorService,
    private cdRef: ChangeDetectorRef,
    public snackBar: SnackBarService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cdRef.detectChanges();
    this.datas = this.data.customOptions;
    this.templateId = this.data.id;
    if (this.options.length > 0) {
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
      this.close.emit(true);
    },
      (error) => {
        this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
      });
  }

  closeAdditional() {
    this.close.emit(false);
  }

  openCustomOptions() {
    this.openOptions.emit(true);
  }

}
