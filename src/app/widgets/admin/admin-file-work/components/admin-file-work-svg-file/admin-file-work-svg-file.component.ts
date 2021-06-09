import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminFileWorkLinkOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-link-overlay/admin-file-work-link-overlay.component';
import { AdminFileWorkEditOverlayComponent } from '@widgets/admin/admin-file-work/components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';
import {
    IReportFolder,
    IReportSvgFile
} from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorConfirmComponent } from '@widgets/admin/admin-report-server-configurator/components/admin-report-server-configurator-repository/admin-report-server-configurator-confirm/admin-report-server-configurator-confirm.component';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
    selector: 'evj-admin-file-work-svg-file',
    templateUrl: './admin-file-work-svg-file.component.html',
    styleUrls: ['./admin-file-work-svg-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkSvgFileComponent {

    @Input() file: IReportSvgFile;

    @Output() fileChanges: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public dialog: MatDialog,
        private arscRootService: AdminReportServerConfiguratorRootService,
    ) {
    }

    // public onClickEdit(): void {
    //     const dialogRef = this.dialog.open(AdminFileWorkEditOverlayComponent, {
    //         data: {
    //             name: this.file?.fileName,
    //         },
    //         hasBackdrop: true,
    //         backdropClass: 'cdk-overlay-transparent-backdrop',
    //     });
    //
    //     dialogRef
    //         .afterClosed()
    //         .subscribe((name: string) => {
    //             if (name) {
    //                 this.arscRootService
    //                     .updateFile({...this.file, fileName: name})
    //                     .subscribe(() => {
    //                         this.fileChanges.emit();
    //                     });
    //             }
    //         });
    // }

    // public onClickLink(): void {
    //     this.dialog.open(AdminFileWorkLinkOverlayComponent, {
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
                        .deleteFile(this.file?.id)
                        .subscribe(() => {
                            this.fileChanges.emit();
                        });
                }
            });
    }
}
