import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
    IFileTemplate,
    IReportTemplate,
    ITemplateFolder,
    ISystemOptions,
    IReportFile,
    IFolder,
    IPostSystemOptionsTemplate,
} from '../../../models/ADMIN/report-server.model';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Injectable({
    providedIn: 'root',
})
export class ReportServerConfiguratorService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    public getReportFileTemplate(): Observable<IReportFile[]> {
        return this.http.get<IReportFile[]>(this.restUrl + '/api/report-filetemplate/all');
    }

    public getReportTemplate(): Observable<IReportTemplate[]> {
        return this.http.get<IReportTemplate[]>(this.restUrl + '/api/report-template/all');
    }

    public getTepmplate(id: number): Observable<any[]> {
        return this.http.get<any[]>(this.restUrl + '/api/report-filetemplate/' + id + '/templates');
    }

    public getReporting(id: number): Observable<IReportTemplate> {
        return this.http.get<IReportTemplate>(this.restUrl + '/api/report-template/' + id);
    }

    public getSystemOptions(): Observable<ISystemOptions[]> {
        return this.http.get<ISystemOptions[]>(this.restUrl + '/api/report-options/system/all');
    }

    public getUserOptions(): Observable<any[]> {
        return this.http.get<any[]>(this.restUrl + '/api/report-options/custom/all');
    }

    public getTemplateFolder(): Observable<IFolder> {
        return this.http.get<IFolder>(this.restUrl + '/api/report-folders/all');
    }

    public pushReportFile(file: any): Observable<any> {
        const body: FormData = new FormData();
        body.append('uploadFile', file, file.name);
        return this.http.post<any>(this.restUrl + '/api/file-storage', body);
    }

    public postReportFileTemplate(body): Observable<IFileTemplate> {
        return this.http.post<IFileTemplate>(this.restUrl + '/api/report-filetemplate/loaded', body);
    }

    public postSystemOptions(id, options): Observable<IPostSystemOptionsTemplate> {
        return this.http.post<IPostSystemOptionsTemplate>(
            this.restUrl + '/api/report-template/' + id + '/system-options',
            options
        );
    }

    public postCustomOptions(id, options): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/report-template/' + id + '/options', options);
    }

    public postReportTemplate(template): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/report-template', template);
    }

    public postTemplateFolder(folder): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/report-folders', folder);
    }

    public putReportFileTemplate(filetemplate): Observable<any> {
        return this.http.put<any>(this.restUrl + '/api/report-filetemplate', filetemplate);
    }

    public putReportTemplate(template): Observable<any> {
        return this.http.put<any>(this.restUrl + '/api/report-template', template);
    }

    public putFolderTemplate(folder): Observable<any> {
        return this.http.put<any>(this.restUrl + '/api/report-folders', folder);
    }

    public deleteReportFileTemplate(id: number): Observable<any> {
        return this.http.delete<any>(this.restUrl + '/api/report-filetemplate/' + id);
    }

    public deleteReportTemplate(id: number): Observable<any> {
        return this.http.delete<any>(this.restUrl + '/api/report-template/' + id);
    }

    public deleteFolder(id: number): Observable<any> {
        return this.http.delete<any>(this.restUrl + '/api/report-folders/' + id);
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }

    ///PROMISE-STYLE
}
