import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportNameConfiguratorComponent } from '@widgets/admin/admin-report-server-configurator/components/admin-report-name-configurator/admin-report-name-configurator.component';
import { AdminFileWorkLinkOverlayComponent } from "@widgets/admin/admin-file-work/components/admin-file-work-link-overlay/admin-file-work-link-overlay.component";
import { AdminFileWorkEditOverlayComponent } from "@widgets/admin/admin-file-work/components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component";

@Component({
    selector: 'evj-admin-file-work-folder',
    templateUrl: './admin-file-work-folder.component.html',
    styleUrls: ['./admin-file-work-folder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkFolderComponent implements OnInit {
    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly windowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/windows.svg';
    public readonly editIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/edit.svg';
    public readonly trashIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/trash.svg';
    public readonly linkIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/link.svg';

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    public editFile(): void {
        const dialogRef = this.dialog.open(AdminFileWorkEditOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    public getLink(): void {
        const dialogRef = this.dialog.open(AdminFileWorkLinkOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }
}
