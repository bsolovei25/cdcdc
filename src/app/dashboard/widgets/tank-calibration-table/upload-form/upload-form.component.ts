import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadDropComponent } from './upload-drop/upload-drop.component';

@Component({
    selector: 'evj-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        console.log(this.data);
    }


    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openDialog(): void {
        const dialogRef = this.dialog
            .open(UploadDropComponent, {
                data: {
                    title: 'Выбор',
                },
                autoFocus: true,
            });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}
