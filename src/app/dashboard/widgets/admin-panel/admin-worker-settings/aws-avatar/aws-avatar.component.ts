import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
    selector: 'evj-aws-avatar',
    templateUrl: './aws-avatar.component.html',
    styleUrls: ['./aws-avatar.component.scss'],
})
export class AwsAvatarComponent implements OnInit {
    @Output() private closePopUp: EventEmitter<string> = new EventEmitter<string>();

    public readonly sideSize: number = 400;

    //#region CROPPER_VARS
    public imageChangedEvent: string = '';
    public croppedImage: string = '';
    //#endregion

    public isImageChosen: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onClose(): void {
        this.closePopUp.emit(null);
    }

    public onSavePhoto(): void {
        this.closePopUp.emit(this.croppedImage);
    }

    //#region CROPPER
    public fileChangeEvent(event: string): void {
        this.imageChangedEvent = event;
        this.isImageChosen = true;
    }
    public imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }
    public imageLoaded(): void {
        // show cropper
    }
    public cropperReady(): void {
        // cropper ready
    }
    public loadImageFailed(): void {
        // show message
    }
    //#endregion
}
