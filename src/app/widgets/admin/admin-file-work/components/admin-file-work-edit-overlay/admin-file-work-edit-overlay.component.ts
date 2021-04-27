import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'evj-admin-file-work-edit-overlay',
  templateUrl: './admin-file-work-edit-overlay.component.html',
  styleUrls: ['./admin-file-work-edit-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileWorkEditOverlayComponent implements OnInit {
    public readonly editIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/editPen.svg';
    public readonly closeIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/close.svg';
    constructor(public dialogRef: MatDialogRef<AdminFileWorkEditOverlayComponent>) {}

    ngOnInit(): void {}

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
