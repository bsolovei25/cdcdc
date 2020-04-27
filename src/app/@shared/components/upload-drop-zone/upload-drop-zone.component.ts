import {
    Component, OnInit, Inject,
    Renderer2, ElementRef, ViewChild, Output, EventEmitter
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-upload-drop-zone',
    templateUrl: './upload-drop-zone.component.html',
    styleUrls: ['./upload-drop-zone.component.scss'],
})
export class UploadDropZoneComponent {

    date: Date = new Date();

    public fileLoad: boolean = false;
    public fileName: string;

    public isUploadBlock: boolean = false;

    @ViewChild('area') area: ElementRef;

    @Output() public file: EventEmitter<File> = new EventEmitter<File>();

    constructor(
        private renderer: Renderer2,
        public snackBar: SnackBarService,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
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

    handleFileInput(event: FileList): void {
        const file: File = event?.[0];
        const typeFile: string = file.name.split('.').pop();
        if (typeFile === 'xls' || typeFile === 'xlsm' || typeFile === 'xlsx') {
            this.fileLoad = true;
            this.fileName = file.name;
            setTimeout(() => {
                this.isUploadBlock = false;
                this.file.emit(file);
                this.fileLoad = false;
            }, 1500);
        } else {
            this.snackBar.openSnackBar('Не верный формат файла', 'snackbar-red');
        }
    }

}
