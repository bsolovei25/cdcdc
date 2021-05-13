import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-parameter-autogeneration',
  templateUrl: './admin-rsc-parameter-autogeneration.component.html',
  styleUrls: ['./admin-rsc-parameter-autogeneration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscParameterAutogenerationComponent implements OnInit {

  public panelOpenState = false;
  public autogenerationParametersValue: {id: number, name: string, param: {id: number, name: string, value: string}[]}[] = [
    {
      id: 1,
      name: 'Новый набор значений',
      param: [
        {
          id: 1,
          name: 'Значение',
          value: 'Смена 1',
        },
        {
          id: 2,
          name: 'Значение по умолчанию',
          value: 'Смена 2',
        },
      ],
    },
    {
      id: 2,
      name: 'Параметр №2',
      param: [
        {
          id: 3,
          name: 'Имя',
          value: 'Смена 3',
        },
        {
          id: 4,
          name: 'Обязательный',
          value: 'Нет',
        },
      ],
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<AdminRscParameterAutogenerationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }

  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
