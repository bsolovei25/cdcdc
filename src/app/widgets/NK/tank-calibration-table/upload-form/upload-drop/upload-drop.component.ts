import { Component, OnInit, OnDestroy, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TankCalibrationTableService } from 'src/app/dashboard/services/widgets/tank-calibration-table.service';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-upload-drop',
    templateUrl: './upload-drop.component.html',
    styleUrls: ['./upload-drop.component.scss'],
})
export class UploadDropComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    public fileLoad: boolean = false;

    extension: string[] = ['xls', 'xlsx'];

    @ViewChild('area') area: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<File>,
        public snackBar: SnackBarService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    uploadFile(file: File): void {
        this.dialogRef.close(file);
    }

}
