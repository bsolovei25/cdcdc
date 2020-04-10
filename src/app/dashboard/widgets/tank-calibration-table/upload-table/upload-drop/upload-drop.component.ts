import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'evj-upload-drop',
    templateUrl: './upload-drop.component.html',
    styleUrls: ['./upload-drop.component.scss'],
})
export class UploadDropComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
