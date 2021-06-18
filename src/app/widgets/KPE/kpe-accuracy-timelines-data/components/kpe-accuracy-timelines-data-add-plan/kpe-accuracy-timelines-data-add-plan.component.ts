import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SnackBarService } from '@dashboard/services/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { KpeAccuracyTimelinesCardService } from '@dashboard/services/widgets/KPE/kpe-accuracy-timelines-card.service';
import { debounceTime } from 'rxjs/operators';
import { IFileInfo } from '@dashboard/models/KPE/kpe-accuracy-timelines-data.model';

@Component({
  selector: 'evj-kpe-accuracy-timelines-data-add-plan',
  templateUrl: './kpe-accuracy-timelines-data-add-plan.component.html',
  styleUrls: ['./kpe-accuracy-timelines-data-add-plan.component.scss']
})

export class KpeAccuracyTimelinesDataAddPlanComponent implements OnInit, OnDestroy {
    private readonly allowedExtensions: string[] = ['docx', 'xlsx', 'pdf', 'mpp'];
    private readonly month: string[] = [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
    ];
    private readonly MAX_FILE_SIZE: number = 6291456;
    private showModalAfterCancelling: boolean = false;
    private subscriptions: Subscription[] = [];

    public chosenDate$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public dateControl: FormControl = new FormControl({ value: new Date(), disabled: false });
    public filesToUpload: File[] = [];
    public downloadedFiles$: Observable<IFileInfo[]>;
    public alert: IAlertWindowModel = null;
    public chosenMonth: number = 0;
    public chosenYear: number = 0;
    public isLoadingData: boolean = false;

    constructor(
        public snackBar: SnackBarService,
        private fb: FormBuilder,
        private kpeAccTimelinesData: KpeAccuracyTimelinesCardService,
        private dialogRef: MatDialogRef<KpeAccuracyTimelinesDataAddPlanComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            endMonth: string,
            endYear: number
        }
    ) {
        this.chosenMonth = this.month.findIndex(value => value === this.data.endMonth);
        this.chosenYear = this.data.endYear;
    }

    ngOnInit(): void {
        this.setDate();
        this.initSubscriptions();
        this.initModal();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
        this.kpeAccTimelinesData.addFiles([]);
    }

    private setDate(): void {
        this.chosenDate$.next(`${this.month[this.chosenMonth]} ${this.chosenYear}`);
    }

    private initSubscriptions(): void {
        this.downloadedFiles$ = this.kpeAccTimelinesData.files$;
        this.subscriptions.push(
            this.chosenDate$.asObservable().pipe(debounceTime(1000)).subscribe(date => {
                this.kpeAccTimelinesData.getFiles(date);
            }),
        )
    }

    private initModal(): void {
        this.alert = this.kpeAccTimelinesData.settingsAlert;
    }

    public toNextMonth(): void {
        this.chosenMonth = this.chosenMonth === 11 ? 0 : this.chosenMonth + 1;
        this.chosenYear = this.chosenMonth === 0 ? this.chosenYear + 1 : this.chosenYear;
        this.kpeAccTimelinesData.addFiles([]);
        this.clearUploadedFileList();
        this.setDate();
    }

    public toPrevMonth(): void {
        this.chosenMonth = this.chosenMonth === 0 ? 11 : this.chosenMonth - 1;
        this.chosenYear = this.chosenMonth === 11 ? this.chosenYear - 1 : this.chosenYear;
        this.kpeAccTimelinesData.addFiles([]);
        this.clearUploadedFileList();
        this.setDate();
    }

    private clearUploadedFileList() : void {
        this.filesToUpload = [];
    }

    public dragOver(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

    public dragLeave(event: DragEvent): void {
        event.preventDefault();
    }

    public dropFile(event: DragEvent): void {
        event.preventDefault();
        this.fileBrowserHandler(event.dataTransfer.files);
    }

    public fileBrowserHandler(event: FileList): void {
        const file: File = event?.[0];
        const typeFile: string = file.name.split('.').pop();

        if (file.size > this.MAX_FILE_SIZE) {
            this.snackBar.openSnackBar('Слишком большой файл!', 'error');
        } else if (this.allowedExtensions.includes(typeFile)) {
            this.filesToUpload = [...this.filesToUpload, file];
        } else {
            this.snackBar.openSnackBar('Неверный формат файла', 'error');
        }
    }

    public deleteUploadedFile(fileIndex: number): void {
        this.filesToUpload = this.filesToUpload.filter((file, index) => index !== fileIndex);
        if (this.filesToUpload.length === 0) {
            this.showModalAfterCancelling = false;
        }
    }

    public deleteDownloadedFile(fileId: string): void {
        this.kpeAccTimelinesData.deleteFileAndFilter(fileId);
    }

    public sendFiles(): void {
        if (this.filesToUpload.length > 0) {
            const date = `${this.month[this.chosenMonth]} ${this.chosenYear}`;
            this.isLoadingData = true;
            this.kpeAccTimelinesData.postFiles(this.filesToUpload, date).subscribe(() => {
                this.isLoadingData = false;
                this.dialogRef.close();
            });
        }  else {
            this.snackBar.openSnackBar('Должен быть загружен хотя бы один файл для отправки', 'error');
        }
    }

    public onCloseModal(): void {
        if (this.showModalAfterCancelling) {
            this.alert.isShow = true;

            this.alert.acceptFunction = () => {
                this.closingFunc();
            }
        } else {
            this.closingFunc();
        }
    }

    private closingFunc(): void {
        this.dialogRef.close();
        this.kpeAccTimelinesData.whenModalClosing();
    }

    public isModalShownAfterCancelling(isShown: boolean): void {
        this.showModalAfterCancelling = isShown;
    }
}
