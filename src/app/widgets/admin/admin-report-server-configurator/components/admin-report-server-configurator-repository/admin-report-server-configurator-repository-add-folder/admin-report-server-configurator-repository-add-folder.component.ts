import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-add',
  templateUrl: './admin-report-server-configurator-repository-add-folder.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-add-folder.component.scss']
})
export class AdminReportServerConfiguratorRepositoryAddFolderComponent implements OnInit {

  public readonly addIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
  public parentFolderId: number;
  public createFolder: boolean;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddFolderComponent>,
    private arscRootService: AdminReportServerConfiguratorRootService
  ) { }

    ngOnInit(): void {
      this.initForm();
    }

    public onClickCreate(): void {
      this.arscRootService
          .createFolder(this.form?.value?.name, this.parentFolderId)
          .subscribe(() => {
              this.clearAndClose();
          });
  }

  public onClickCancel(): void {
    this.clearAndClose();
  }

  private clearAndClose(): void {
      this.dialogRef?.close();
      this.form?.reset();
  }

  private initForm(): void {
      this.form = new FormGroup({
          name: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
          ])
      })
  }
}
