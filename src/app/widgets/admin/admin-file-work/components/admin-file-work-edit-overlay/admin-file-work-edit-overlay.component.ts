import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'evj-admin-file-work-edit-overlay',
  templateUrl: './admin-file-work-edit-overlay.component.html',
  styleUrls: ['./admin-file-work-edit-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileWorkEditOverlayComponent implements OnInit {

    public name: string;

    constructor(
        public dialogRef: MatDialogRef<AdminFileWorkEditOverlayComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {name: string},
    ) {}

    ngOnInit(): void {
        this.name = this.data?.name;
    }

    public cancel(): void {
        this.dialogRef.close(false);
    }

    public accept(): void {
        this.dialogRef.close(this.name);
    }
}
