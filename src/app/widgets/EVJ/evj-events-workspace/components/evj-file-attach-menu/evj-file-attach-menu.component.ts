import { Component, Inject } from '@angular/core';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IMessageFileAttachment } from '@shared/interfaces/message.model';
import { UploadDropZoneComponent } from '@shared/components/upload-drop-zone/upload-drop-zone.component';
import { FileAttachMenuService } from '../../../../../dashboard/services/file-attach-menu.service';

export interface IChatAllowedExtensions {
    [index: string]: string[];
}

@Component({
    templateUrl: './evj-file-attach-menu.component.html',
    styleUrls: ['./evj-file-attach-menu.component.scss'],
})
export class EvjFileAttachMenuComponent {
    private allowedExtensions: IChatAllowedExtensions = {
        image: ['jpg', 'png', 'jpeg', 'heic', 'heif', 'JPG'],
        document: ['docx', 'doc', 'xls', 'xlsx', 'pdf', 'p7s', 'rtx', 'pptx'],
        archive: ['zip', 'zipx', 'rar', 'cab'],
        video: ['mov', 'mp4', 'm4v', 'webm'],
    };

    public filesToUpload: IMessageFileAttachment[] = [];

    constructor(
        private popoverRef: PopoverRef,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fileAttachMenuService: FileAttachMenuService
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

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result);
            }
        });
    }

    public deleteFile(index: number): void {
        this.filesToUpload.splice(index, 1);
    }

    public close(): void {
        this.popoverRef.close('close', { id: 1 });
    }

    private addFile(file: File, fileType: 'image' | 'document' | 'archive' | 'video'): void {
        this.filesToUpload.push({
            name: file.name,
            size: this.fileAttachMenuService.convertBytes(file.size),
            type: fileType,
            _file: file,
        } as IMessageFileAttachment);
    }
}
