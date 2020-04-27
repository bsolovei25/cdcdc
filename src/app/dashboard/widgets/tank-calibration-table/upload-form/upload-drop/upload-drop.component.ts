import { Component, OnInit, OnDestroy, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TankCalibrationTableService } from '../../../../services/widgets/tank-calibration-table.service';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
    selector: 'evj-upload-drop',
    templateUrl: './upload-drop.component.html',
    styleUrls: ['./upload-drop.component.scss'],
})
export class UploadDropComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    public fileLoad: boolean = false;

    @ViewChild('area') area: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private calibrationService: TankCalibrationTableService,
        private renderer: Renderer2,
        public snackBar: SnackBarService,
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

    addPhoto(event): void {
        let target = event.target || event.srcElement;
        let file = target?.files?.[0];

        this.dialogRef.close(file);
    }

    dragOver(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.renderer.addClass(this.area.nativeElement, 'hover');
    }

    dragLeave(event: DragEvent): void {
        event.preventDefault();
        this.renderer.removeClass(this.area.nativeElement, 'hover');
    }

    dropFile(event: DragEvent): void {
        event.preventDefault();
        this.renderer.removeClass(this.area.nativeElement, 'hover');
        this.handleFileInput(event.dataTransfer.files);
    }

    handleFileInput(event): void {
        let file = event[0];
        const type_file = file.name.split('.').pop();
        if (type_file === 'xls' || type_file === 'xlsm' || type_file === 'xlsx') {
            this.dialogRef.close(file);
        } else {
            this.snackBar.openSnackBar('Не верный формат файла', 'snackbar-red');
        }
    }

    uploadFile(event): void {
        this.dialogRef.close(event);
    }

}
