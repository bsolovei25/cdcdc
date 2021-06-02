import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminFileWorkLinkOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-link-overlay/admin-file-work-link-overlay.component';
import { AdminFileWorkEditOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';
import { IReportFolder } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
    selector: 'evj-admin-file-work-folder',
    templateUrl: './admin-file-work-folder.component.html',
    styleUrls: ['./admin-file-work-folder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkFolderComponent {

    @Input() folder: IReportFolder;

    @Output() onClickFolder: EventEmitter<void> = new EventEmitter<void>();

    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly windowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/windows.svg';
    public readonly editIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/edit.svg';
    public readonly trashIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/trash.svg';
    public readonly linkIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/link.svg';

    constructor(public dialog: MatDialog) {
    }

    public onClickOpenFolder(): void {
        this.onClickFolder.emit();
    }

    public onClickEdit(): void {
        const dialogRef = this.dialog.open(AdminFileWorkEditOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    public onClickLink(): void {
        const dialogRef = this.dialog.open(AdminFileWorkLinkOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    public onClickDuplicate(): void {}

    public onClickDelete(): void {}
}
