import { Component, Inject } from '@angular/core';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
    UploadDropZoneComponent
} from '@shared/components/upload-drop-zone/upload-drop-zone.component';

export interface IChatAllowedExtensions {
    [index: string]: string[];
}

export interface IChatFileAttach {
    name: string;
    size: string;
    type: 'image' | 'document' | 'archive' | 'video';
    _file?: File;
}

@Component({
    templateUrl: './file-attach-menu.component.html',
    styleUrls: ['./file-attach-menu.component.scss']
})
export class FileAttachMenuComponent {
    private allowedExtensions: IChatAllowedExtensions = {
        image: ['jpg', 'png', 'jpeg'],
        document: ['docx', 'doc', 'xls', 'xlsx'],
        archive: ['zip'],
        video: ['mov', 'mp4'],
    };

    public filesToUpload: IChatFileAttach[] = [];

    constructor(
        private popoverRef: PopoverRef,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.popoverRef.close('backdropClick', this.filesToUpload);
        });
        if (this.popoverRef.data) {
            this.filesToUpload = this.popoverRef.data;
        }
    }

    public openDialog(fileType: 'image' | 'document' | 'archive' | 'video'): void {
        const dialogRef = this.dialog.open(UploadDropZoneComponent, {
            data: {
                title: 'Выбор',
            },
            autoFocus: true,
        });
        dialogRef.componentInstance.extension = this.allowedExtensions[fileType];

        dialogRef.componentInstance.file.subscribe(($event) => {
            this.addFile($event, fileType);
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
            }
        });
    }

    public deleteFile(index: number): void {
        this.filesToUpload.splice(index, 1);
    }

    public close(): void {
        this.popoverRef.close('close', {id: 1});
    }

    private addFile(file: File, fileType: 'image' | 'document' | 'archive' | 'video'): void {
        this.filesToUpload.push({
            name: file.name,
            size: this.convertBytes(file.size),
            type: fileType,
            _file: file,
        } as IChatFileAttach);
    }

    private convertBytes(value: number): string {
        const sizes = ['Bytes', 'kb', 'mb', 'gb'];
        if (value === 0) {
            return '0 byte';
        }
        const i = parseInt(Math.floor(Math.log(value) / Math.log(1024)).toString(), 0);
        return Math.round(value / Math.pow(1024, i)) + ' ' + sizes[i];
    }
}