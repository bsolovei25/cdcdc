import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IFolderReport } from '../../../components/report/reports.component';
import { saveAs } from 'file-saver';
import { ICustomReportProperties } from "@widgets/admin/custom-report-properties-reference/custom-report-properties-reference.component";

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

    public postCustomOptions(body: ICustomReportProperties): Observable<any> {
        return this.http.post<any[]>(this.restUrl + '/api/report-options/custom', body);
    }

    public putCustomOptions(body: ICustomReportProperties): Observable<any> {
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
        const result = await this.http
            .post(`${this.restUrl}/api/report-image`, body, {
                responseType: 'blob' as 'json',
                observe: 'response',
            })
            .toPromise();
        const filename =
            (result as any)?.headers?.get('Content-Disposition')?.split(';')[1]?.trim()?.split('=')[1] ?? 'report.xlsx';
        saveAs((result as any).body, filename);
    }
}
