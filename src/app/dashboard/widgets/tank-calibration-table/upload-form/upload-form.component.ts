import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadDropComponent } from './upload-drop/upload-drop.component';
import { TankCalibrationTableService } from '../../../services/tank-calibration-table.service';

@Component({
    selector: 'evj-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    body: {
        startDate: Date;
        endDate: Date;
        file: FormData;
        comment: string;
    } = {
            startDate: new Date(),
            endDate: new Date(),
            file: new FormData(),
            comment: '',
        };
    comment: string = '';

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<any>,
        private calibrationService: TankCalibrationTableService,
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

    submitForm(): void {
        this.body.comment = this.comment;
        console.log(this.body);

        this.dialogRef.close(this.body);
    }

    dateTimePickerInputStart(date: Date): void {
        this.body.startDate = date;
    }

    dateTimePickerInputEnd(date: Date): void {
        this.body.endDate = date;
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
            if (result) {
                console.log(result);

                this.body.file = result;
            }
        });
    }

}
