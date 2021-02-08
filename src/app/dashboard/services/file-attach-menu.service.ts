import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

@Injectable({
    providedIn: 'root',
})
export class FileAttachMenuService {
    private restUrl: string;

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = this.configService.restUrl;
    }

    public convertBytes(value: number): string {
        const sizes = ['Bytes', 'kb', 'mb', 'gb'];
        if (value === 0) {
            return '0 byte';
        }
        const i = parseInt(Math.floor(Math.log(value) / Math.log(1024)).toString(), 0);
        return Math.round(value / Math.pow(1024, i)) + ' ' + sizes[i];
    }

    public async uploadFile(file: File): Promise<string> {
        const body: FormData = new FormData();
        body.append('uploadFile', file, file.name);
        return await this.http.post<string>(this.restUrl + '/api/file-storage', body).toPromise();
    }

    public async getFileInfoById(fileId: string): Promise<any> {
        return await this.http.get<any>(this.restUrl + `/api/file-storage/info/${fileId}`).toPromise();
    }
}
