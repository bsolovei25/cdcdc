import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'evj-admin-rsc-period-edit',
  templateUrl: './admin-rsc-period-edit.component.html',
  styleUrls: ['./admin-rsc-period-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ]
})
export class AdminRscPeriodEditComponent implements OnInit {

  public selectTypeDate$: BehaviorSubject<{ type: string, name: string, isActive: boolean }> =
    new BehaviorSubject<{ type: string, name: string, isActive: boolean }>({
      type: 'withoutTime',
      name: 'Без запроса времени',
      isActive: false,
    });
  public typeDate: { type: string, name: string, isActive: boolean }[] = [
    {
      type: 'year',
      name: 'Годичный',
      isActive: false,
    },
    {
      type: 'month',
      name: 'Месячный',
      isActive: false,
    },
    {
      type: 'day',
      name: 'Суточный',
      isActive: false,
    },
    {
      type: 'anyTime',
      name: 'Произвольное время',
      isActive: false,
    },
    {
      type: 'exactTime',
      name: 'Точное время',
      isActive: false,
    },
    {
      type: 'anyDate',
      name: 'Произвольная дата',
      isActive: false,
    },
    {
      type: 'withoutTime',
      name: 'Без запроса времени',
      isActive: false,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<AdminRscPeriodEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }

  public change(event: MatRadioChange) {
    this.data.periodType = event.value;
  }

  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
