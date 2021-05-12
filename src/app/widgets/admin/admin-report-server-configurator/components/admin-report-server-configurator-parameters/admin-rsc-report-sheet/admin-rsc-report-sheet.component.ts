import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-report-sheet',
  templateUrl: './admin-rsc-report-sheet.component.html',
  styleUrls: ['./admin-rsc-report-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscReportSheetComponent implements OnInit {

  public sheets: {name: string, isView: boolean, value: number}[] = [
    {
        name: 'test1',
        isView: true,
        value: 1,
    },
    {
        name: 'test2',
        isView: false,
        value: 2,
    },
    {
        name: 'test3',
        isView: true,
        value: 3,
    },
];

  constructor(
    public dialogRef: MatDialogRef<AdminRscReportSheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }
  
  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
