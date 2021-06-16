import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppConfigService } from '@core/service/app-config.service';
import { AuthService } from '@core/service/auth.service';
import { FileAttachMenuService } from '@dashboard/services/file-attach-menu.service';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { IFileInfo } from '@dashboard/models/KPE/kpe-accuracy-timelines-data.model';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class KpeAccuracyTimelinesCardService {
    private readonly restUrl: string;
    private readonly corruptedFileId: string = '00000000-0000-0000-0000-000000000000';
    private _files$: BehaviorSubject<IFileInfo[]> = new BehaviorSubject<IFileInfo[]>([]);
    private _isModalWindowClosed$: Subject<boolean> = new Subject<boolean>();

    public files$: Observable<IFileInfo[]> = this._files$.asObservable();
    public isModalWindowClosed$: Observable<boolean> = this._isModalWindowClosed$.asObservable();

    public addFiles(files: IFileInfo[]): void {
        this.files = [...files];
        this._files$.next(this.files);
    }
    public files: IFileInfo[] = [];

    public whenModalClosing(): void {
        this._isModalWindowClosed$.next(true);
    }

    public settingsAlert: IAlertWindowModel = {
        isShow: false,
        questionText: 'Некоторые файлы были успешно загружены. Вы действительно хотите отменить отправку файлов?',
        acceptText: 'Подтвердить',
        cancelText: 'Вернуться',
        acceptFunction: () => null,
        cancelFunction: () => null,
        closeFunction: () => (this.settingsAlert.isShow = false),
    };

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
        private authService: AuthService,
        private fileAttachService: FileAttachMenuService
    ) {
        this.restUrl = this.configService.restUrl;
    }

    public postFiles(files: File[], planDate: string): Observable<string[]> {
        const formData: FormData = new FormData();
        const url = `${this.restUrl}/api/kpe/File/add/several/${planDate}`;

        files.forEach(file => formData.append('uploadFiles', file));
        return this.http.post<string[]>(url, formData);
    }

    public deleteFileAndFilter(fileId: string): void {
        this.deleteFile(fileId).subscribe(res => {
            const downloadedFilesWithoutDeleted = this.files.filter((file) => file.id !== res);
            this.addFiles(downloadedFilesWithoutDeleted);
        })
    }

    public deleteFile(fileId: string): Observable<string> {
        const url = `${this.restUrl}/api/kpe/File/delete/${fileId}`;

        return this.http.delete<string>(url);
    }

    public getFiles(planDate: string): void {
        this.clearCurrentFiles();
        this.getFilesIds(planDate).subscribe((fileIds: string[]) => {
            if (fileIds.length > 0) {
                this.getFileInfoAndDownload(fileIds);
            }
        })
    }

    private clearCurrentFiles(): void {
        this.files = [];
        this._files$.next(this.files);
    }

    private getFileInfoAndDownload(fileIds: string[]): void {
        fileIds.forEach(id => {
            if (id !== this.corruptedFileId) {
                this.fileAttachService.getFileInfoById(id).then(file => {
                    this.downloadFileWithProgress(file);
                })
            }
        })
    }

    public getFilesIds(planDate: string): Observable<string[]> {
        const url = `${this.restUrl}/api/kpe/File/period/${planDate}`;

        return this.http.get<string[]>(url);
    }

    public downloadFileWithProgress(file): void {
            const modifiedFile = this.modifyFileInfoObj(file);
            this.files = [...this.files, modifiedFile];
            this._files$.next(this.files);

            this.downloadFile(modifiedFile.id)
                .pipe(takeUntil(this.isModalWindowClosed$))
                .subscribe(result => {
                if (result.type === HttpEventType.DownloadProgress) {
                    file.percent = Math.round(100 * result.loaded / result.total);
                }
                if (result.type === HttpEventType.Response) {
                    console.log(result.body);
                }
            })
    }

    private modifyFileInfoObj(file: any): IFileInfo {
        file.name = file.fileName;
        file.size = file.length
        file.percent = 0;

        delete file.fileName;
        delete file.length;
        return file;
    }

    public downloadFile(fileId: string): Observable<HttpEvent<Blob>> {
        const url = `${this.restUrl}/api/file-storage/${fileId}`;

        return this.http.get(url, { responseType: 'blob', reportProgress: true, observe: 'events' });
    }
}

