import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminFileWorkLinkOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-link-overlay/admin-file-work-link-overlay.component';
import { AdminFileWorkEditOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';
import {
    IReportFolder,
    IReportSvgFile
} from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
    selector: 'evj-admin-file-work-svg-file',
    templateUrl: './admin-file-work-svg-file.component.html',
    styleUrls: ['./admin-file-work-svg-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkSvgFileComponent {

    @Input() file: IReportSvgFile;

    constructor(public dialog: MatDialog) {
    }

    public onClickEdit(): void {
        this.dialog.open(AdminFileWorkEditOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    public onClickLink(): void {
        this.dialog.open(AdminFileWorkLinkOverlayComponent, {
            data: {},
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    public onClickDuplicate(): void {}

    public onClickDelete(): void {}
}
