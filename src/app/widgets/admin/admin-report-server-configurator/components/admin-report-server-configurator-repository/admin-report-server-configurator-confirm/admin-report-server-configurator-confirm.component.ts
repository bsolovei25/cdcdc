import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-admin-report-server-configurator-confirm',
    templateUrl: './admin-report-server-configurator-confirm.component.html',
    styleUrls: ['./admin-report-server-configurator-confirm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorConfirmComponent {

    constructor(
        public dialogRef: MatDialogRef<AdminReportServerConfiguratorConfirmComponent>,
    ) {}

    public accept(): void {
        this.dialogRef.close(true);
    }

    public cancel(): void {
        this.dialogRef.close(false);
    }

}
