import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-path-edit',
  templateUrl: './admin-rsc-path-edit.component.html',
  styleUrls: ['./admin-rsc-path-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscPathEditComponent implements OnInit {

  public panelOpenState = false;
  public pathData: {id: number, name: string, catalog: {id: number, mail: string, active: boolean}[]}[] =  [
    {
        id: 1,
        name: 'C/auth',
        catalog: [
            {
                id: 1,
                mail: 'test1@test.ru',
                active: true
            },
            {
                id: 2,
                mail: 'test2@test.ru',
                active: true

            },
        ],
    },
    {
        id: 2,
        name: 'D/auth',
        catalog: [
            {
                id: 3,
                mail: 'test3@test.ru',
                active: true

            },
            {
                id: 4,
                mail: 'test4@test.ru',
                active: false
            },
        ],
    },
];
  constructor(
    public dialogRef: MatDialogRef<AdminRscPathEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }

  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
