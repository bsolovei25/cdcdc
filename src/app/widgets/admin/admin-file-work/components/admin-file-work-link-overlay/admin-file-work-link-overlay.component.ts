import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-admin-file-work-link-overlay',
    templateUrl: './admin-file-work-link-overlay.component.html',
    styleUrls: ['./admin-file-work-link-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFileWorkLinkOverlayComponent implements OnInit {
    public readonly windowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/windows.svg';
    public readonly linkIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/linkBold.svg';
    public readonly closeIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/close.svg';
    constructor(public dialogRef: MatDialogRef<AdminFileWorkLinkOverlayComponent>) {}

    ngOnInit(): void {}

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
