import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminFileWorkEditOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';
import { IReportFolder } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorConfirmComponent } from '@widgets/admin/admin-report-server-configurator/components/admin-report-server-configurator-repository/admin-report-server-configurator-confirm/admin-report-server-configurator-confirm.component';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
    selector: 'evj-admin-file-work-folder',
    templateUrl: './admin-file-work-folder.component.html',
    styleUrls: ['./admin-file-work-folder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkFolderComponent {

    @Input() folder: IReportFolder;

    @Output() folderClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() folderChanges: EventEmitter<void> = new EventEmitter<void>();

    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly windowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/windows.svg';
    public readonly editIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/edit.svg';
    public readonly trashIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/trash.svg';
    public readonly linkIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/link.svg';

    constructor(
        public dialog: MatDialog,
        private arscRootService: AdminReportServerConfiguratorRootService,
    ) {
    }

    public onClickOpenFolder(): void {
        this.folderClick.emit();
    }

    public onClickEdit(): void {
        const dialogRef = this.dialog.open(AdminFileWorkEditOverlayComponent, {
            data: {
                name: this.folder?.name,
            },
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });

        dialogRef
            .afterClosed()
            .subscribe((name: string) => {
                if (name) {
                    this.arscRootService
                        .updateFolder({...this.folder, name})
                        .subscribe(() => {
                            this.folderChanges.emit();
                        });
                }
            });
    }

    // public onClickLink(): void {
    //     const dialogRef = this.dialog.open(AdminFileWorkLinkOverlayComponent, {
    //         data: {},
    //         hasBackdrop: true,
    //         backdropClass: 'cdk-overlay-transparent-backdrop',
    //     });
    // }

    // public onClickDuplicate(): void {}

    public onClickDelete(): void {
        const dialogRef = this.dialog.open(AdminReportServerConfiguratorConfirmComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });

        dialogRef
            .afterClosed()
            .subscribe((result: boolean) => {
                if (result) {
                    this.arscRootService
                        .deleteFolder2(this.folder?.id)
                        .subscribe(() => {
                            this.folderChanges.emit();
                        });
                }
            });
    }
}
