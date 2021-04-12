import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-add',
  templateUrl: './admin-report-server-configurator-repository-add.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-add.component.scss']
})
export class AdminReportServerConfiguratorRepositoryAddComponent implements OnInit {

  public readonly addIcon='assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';

  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
