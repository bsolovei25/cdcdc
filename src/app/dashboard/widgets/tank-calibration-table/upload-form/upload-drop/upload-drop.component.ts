import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TankCalibrationTableService } from '../../../../services/tank-calibration-table.service';

@Component({
    selector: 'evj-upload-drop',
    templateUrl: './upload-drop.component.html',
    styleUrls: ['./upload-drop.component.scss'],
})
export class UploadDropComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    constructor(
        public dialogRef: MatDialogRef<any>,
        private calibrationService: TankCalibrationTableService,
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

    async addPhoto(event) {
        let target = event.target || event.srcElement;
        try {
            let file = target?.files?.[0];
            let reader = new FileReader();
            reader.readAsBinaryString(file);
            console.log(file);

            const body: FormData = new FormData();
            body.append('uploadFile', file, 'dsadas');

            this.dialogRef.close(body);
        } catch (error) {

        }

    }

}
