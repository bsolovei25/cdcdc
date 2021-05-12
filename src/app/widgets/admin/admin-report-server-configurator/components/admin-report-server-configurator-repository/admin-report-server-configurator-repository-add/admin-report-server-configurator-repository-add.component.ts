import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-add',
  templateUrl: './admin-report-server-configurator-repository-add.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-add.component.scss']
})
export class AdminReportServerConfiguratorRepositoryAddComponent implements OnInit {

  public readonly addIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
  public newRecord: string;
  public folderActive: number;
  public createFolder: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddComponent>,
    private arscRootService: AdminReportServerConfiguratorRootService
  ) { }

  ngOnInit(): void {
  }

  public async onPushFolder(): Promise<void> {
    if (this.newRecord?.trim().length > 0 && this.newRecord) {
      const data: { name: string, parentFolderId: number } = {
        name: this.newRecord,
        parentFolderId: this.folderActive,
      };
      await this.arscRootService.postTemplateFolder(data);
      this.newRecord = null;
    } else {
      this.newRecord = null;
    }
    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
