import { ChangeDetectionStrategy, Component, ElementRef, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

export class FileExt {
    pending: boolean;
    status: 'success' | 'error';
    constructor(public src: string, public file: File) {}
}

@Component({
    selector: 'evj-cmid-event-file-dropzone',
    templateUrl: './evj-cmid-event-file-dropzone.component.html',
    styleUrls: ['./evj-cmid-event-file-dropzone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventFileDropzoneComponent implements ControlValueAccessor {
    public val: FileExt[] = [];
    public fileList: FileExt[] = [];
    public fileList$: Subject<FileExt[]> = new Subject<FileExt[]>();

    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    get value(): FileExt[] {
        return this.val;
    }

    set value(val: FileExt[]) {
        if (Array.isArray(val)) {
            this.fileList = val;
            this.onSuccess(this.fileList);
            this.onTouched();
        }
    }

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl != null) {
            ngControl.valueAccessor = this;
        }
    }

    public dndLeave(event: DragEvent): void {
    }

    public dndOver(event: DragEvent): void {
    }

    public dndDrop(event: DragEvent): void {
        if (event.dataTransfer.files.length) {
            this.processFile(event.dataTransfer);
        }
    }


    public openLoadFileDialog(): void {
        this.fileInput.nativeElement.value = null;
        this.fileInput.nativeElement.click();
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public onChange = (fn: File[]) => {};

    public onTouched = () => {};

    public changeListener($event: Event): void {
        this.processFile($event.target as HTMLInputElement);
    }

    private processFile(fileInput: HTMLInputElement | DataTransfer): void {
        const singleFile: File = fileInput.files[0];
        const reader = new FileReader();

        try {
            if (fileInput.files.length > 1) {
                Array.from(fileInput.files).forEach((file) => {
                    reader.addEventListener('load', (event: any) => {
                        const result = event.target.result;
                        this.fileList = [...this.fileList, new FileExt(result, file)];
                        this.onSuccess(this.fileList);
                    });
                })
            } else {
                reader.addEventListener('load', (event: any) => {
                    this.fileList = [...this.fileList, new FileExt(event.target.result, singleFile)];
                    this.onSuccess(this.fileList);
                });
            }
        } catch (e) {
            this.onError();
        }

        if (fileInput.files.length > 1) {
            Array.from(fileInput.files).forEach(file => reader.readAsDataURL(file));
        } else {
            reader.readAsDataURL(singleFile);
        }
    }

    private onSuccess(value: FileExt[]): void {
        if (value) {
            this.onChange(value.map(element => element.file));
            this.fileList$.next(this.fileList);
        } else {
            this.onChange([]);
        }
    }

    private onError(): void {}

    writeValue(obj: FileExt[]): void {
        this.value = obj;
    }

}
