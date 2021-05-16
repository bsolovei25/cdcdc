import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-autogeneration',
  templateUrl: './admin-rsc-autogeneration.component.html',
  styleUrls: ['./admin-rsc-autogeneration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscAutogenerationComponent implements OnInit {

  public autogeneration = [
    {name: 'Включить автогенерацию', value: true},
    {name: 'Использовать интервал шаблона', value: false}
  ]
  constructor(
    public dialogRef: MatDialogRef<AdminRscAutogenerationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }

  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
