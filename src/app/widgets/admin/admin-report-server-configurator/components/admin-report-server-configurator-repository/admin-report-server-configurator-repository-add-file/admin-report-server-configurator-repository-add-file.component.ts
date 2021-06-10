import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-add-file',
  templateUrl: './admin-report-server-configurator-repository-add-file.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-add-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorRepositoryAddFileComponent implements OnInit {

  public readonly addIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
  public readonly loadIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/load-file.svg';
  public newRecord: string;
  public folderActive: number;

  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddFileComponent>,
    private arscRootService: AdminReportServerConfiguratorRootService,
  ) { }

  ngOnInit(): void {
  }

  public async onClickUpload(): Promise<void> {
    if (this.newRecord?.trim().length > 0 && this.newRecord !== undefined) {

        const data: { name: string, folderId: number } = {
          name: this.newRecord,
          folderId: this.folderActive === 0 ? null : this.folderActive,
        };
        await this.arscRootService.uploadFile(null, null, null, null);
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
