import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITemplateFolder } from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-rsc-repository-edit',
  templateUrl: './admin-rsc-repository-edit.component.html',
  styleUrls: ['./admin-rsc-repository-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscRepositoryEditComponent implements OnInit {
  public readonly addIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
  public newRecord: string;
  public folderActive: number;
  public createFolder: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdminRscRepositoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item: ITemplateFolder},
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
