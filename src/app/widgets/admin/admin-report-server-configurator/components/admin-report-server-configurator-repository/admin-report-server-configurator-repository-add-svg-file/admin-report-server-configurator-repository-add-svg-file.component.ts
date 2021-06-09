import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
    selector: 'evj-admin-report-server-configurator-repository-add-file',
    templateUrl: './admin-report-server-configurator-repository-add-svg-file.component.html',
    styleUrls: ['./admin-report-server-configurator-repository-add-svg-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorRepositoryAddSvgFileComponent {

    public readonly addIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/add-logo.svg';
    public readonly loadIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/load-file.svg';
    public fileName: string;
    public selectedFile: File;

    constructor(
        public dialogRef: MatDialogRef<AdminReportServerConfiguratorRepositoryAddSvgFileComponent>,
        private arscRootService: AdminReportServerConfiguratorRootService,
    ) {
    }

    public onClickUpload(): void {
        this.arscRootService
            .uploadFile(
                this.fileName,
                '',
                this.selectedFile,
                this.arscRootService.selectedFolderId,
            )
            .subscribe(() => {
                this.closeAndClear();
            });
    }

    public onNoClick(): void {
        this.closeAndClear();
    }

    public onDropFile(event: DragEvent): void {
        event.preventDefault();
        const files: FileList = event?.dataTransfer?.files;

        if (files && files[0]) {
            this.selectedFile = files[0];
        }
    }

    public onChangeInputFile(event: Event): void {
        const target = event?.target as HTMLInputElement;
        const files: FileList = target?.files;

        if (files && files[0]) {
            this.selectedFile = files[0];
        }
    }

    private closeAndClear(): void {
        this.dialogRef?.close();
        this.fileName = null;
        this.selectedFile = null;
    }

}
