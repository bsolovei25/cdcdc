import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomOptions, IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-custom-options',
  templateUrl: './admin-rsc-custom-options.component.html',
  styleUrls: ['./admin-rsc-custom-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscCustomOptionsComponent implements OnInit {

  public optionsName = {
    description: 'Описание',
    type: 'Тип',
    validationRule: 'Правило проверки',
    isRequired: 'Обязательный',
    source: 'Источник',
    sortOrder: 'Сортировка',
  };
  public arrayOptions = [];
  public panelOpenState: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdminRscCustomOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: IReportTemplate, userOptions?: ICustomOptions[] },
  ) { }

  ngOnInit(): void {
    this.data.userOptions.forEach(v => {
      this.data.data.customOptions.forEach(f => {
        if (f.id === v.id) {
          v.isActive = true;
        }
      })
    });
    this.arrayOptions = this.data.data.customOptions;
  }

  public chooseParameter(item: ICustomOptions): void {
    item.isActive = !item.isActive;
    if (item.isActive) {
        this.arrayOptions.push(item);
    } else {
        let index = this.arrayOptions.findIndex((e) => e.id === item.id);
        this.arrayOptions.splice(index, 1);
    }
  }

  public onSave(): void {
    this.data.data.customOptions = this.arrayOptions;
    this.dialogRef.close(this.data.data);
    console.log(this.data.data.customOptions);
  }
}
