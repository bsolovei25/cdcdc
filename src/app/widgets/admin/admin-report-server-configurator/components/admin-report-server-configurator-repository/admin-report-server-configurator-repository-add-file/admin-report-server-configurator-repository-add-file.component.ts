import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-add-file',
  templateUrl: './admin-report-server-configurator-repository-add-file.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-add-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorRepositoryAddFileComponent implements OnInit {

  public readonly addIcon='assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
  public readonly loadIcon='assets/icons/widgets/admin/admin-report-server-configurator/load-file.svg';


  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddFileComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
