import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IFolderReport } from '../../../components/report/reports.component';

@Injectable({
    providedIn: 'root',
})
export class ReportsService {
    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    async getReportsTemplate(): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + `/api/report-template/all`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getTemplate(id: number): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + `/api/report-template/${id}`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getTemplateFolder(): Promise<IFolderReport> {
        return await this.http.get<IFolderReport>(this.restUrl + '/api/report-folders/all').toPromise();
    }

    async postTemplate(id: number, body): Promise<any> {
        return this.http.post<any>(this.restUrl + `/api/reporting/${id}/template/create`, body).toPromise();
    }

    public getCustomOptions(): Observable<any> {
        return this.http.get<any[]>(this.restUrl + '/api/report-options/custom/all');
    }

    public postCustomOptions(body): Observable<any> {
        return this.http.post<any[]>(this.restUrl + '/api/report-options/custom', body);
    }

    public putCustomOptions(body): Observable<any> {
        return this.http.put<any[]>(this.restUrl + '/api/report-options/custom/' + body.id, body);
    }

    public deleteCustomOptions(id: number): Observable<any> {
        return this.http.delete<any[]>(this.restUrl + '/api/report-options/custom/' + id);
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }

    public async sendScreenshot(screenshot: File): Promise<any> {
        const body: FormData = new FormData();
        body.append('file', screenshot);
        // return await this.http.post<any>(`${this.restUrl}/api/reporting/image`, body).toPromise();
        return await this.http.post<any>(`https://reporting.funcoff.club/api/image`, body).toPromise();
    }
}
