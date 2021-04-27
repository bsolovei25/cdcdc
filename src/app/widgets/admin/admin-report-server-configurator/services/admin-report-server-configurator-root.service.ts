import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "@core/service/app-config.service";
import {
    IReportFile,
    IReportTemplate,
    ISystemOptions,
    IFolder,
    IFileTemplate,
    IPostSystemOptionsTemplate,
    ICustomOptionsTemplate,
    ICustomOptions
} from "../models/admin-report-server-configurator.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AdminReportServerConfiguratorRootService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
    public getReportFileTemplate(): Promise<IReportFile[]> {
        return this.http.get<IReportFile[]>(this.restUrl + '/api/report-filetemplate/all').toPromise();
    }

    public getReportTemplate(): Promise<IReportTemplate[]> {
        return this.http.get<IReportTemplate[]>(this.restUrl + '/api/report-template/all').toPromise();
    }

    public getTepmplate(id: number): Promise<IReportTemplate[]> {
        return this.http
            .get<IReportTemplate[]>(this.restUrl + '/api/report-filetemplate/' + id + '/templates')
            .toPromise();
    }

    public getReporting(id: number): Promise<IReportTemplate> {
        return this.http.get<IReportTemplate>(this.restUrl + '/api/report-template/' + id).toPromise();
    }

    public getSystemOptions(): Promise<ISystemOptions[]> {
        return this.http.get<ISystemOptions[]>(this.restUrl + '/api/report-options/system/all').toPromise();
    }

    public getUserOptions(): Promise<ICustomOptions[]> {
        return this.http.get<ICustomOptions[]>(this.restUrl + '/api/report-options/custom/all').toPromise();
    }

    public getTemplateFolder(): Promise<IFolder> {
        return this.http.get<IFolder>(this.restUrl + '/api/report-folders/all').toPromise();
    }

    public postReportFileTemplate(body): Promise<IFileTemplate> {
        return this.http.post<IFileTemplate>(this.restUrl + '/api/report-filetemplate/loaded', body).toPromise();
    }

    public postSystemOptions(id, options): Promise<IPostSystemOptionsTemplate> {
        return this.http
            .post<IPostSystemOptionsTemplate>(this.restUrl + '/api/report-template/' + id + '/system-options', options)
            .toPromise();
    }

    public putReportFileTemplate(filetemplate): Promise<IReportTemplate> {
        return this.http.put<IReportTemplate>(this.restUrl + '/api/report-filetemplate', filetemplate).toPromise();
    }

    public putReportTemplate(template): Promise<IReportTemplate> {
        return this.http.put<IReportTemplate>(this.restUrl + '/api/report-template', template).toPromise();
    }

    public deleteReportTemplate(id: number): Promise<IReportTemplate> {
        return this.http.delete<IReportTemplate>(this.restUrl + '/api/report-template/' + id).toPromise();
    }

    public postReportTemplate(template): Promise<IReportTemplate> {
        return this.http.post<IReportTemplate>(this.restUrl + '/api/report-template', template).toPromise();
    }

    public postTemplateFolder(folder): Promise<any> {
        return this.http.post<any>(this.restUrl + '/api/report-folders', folder).toPromise();
    }

    public putFolderTemplate(folder: { name: string, parentFolderId: number, id: number }): Promise<any> {
        return this.http.put<any>(this.restUrl + "/api/report-folders", folder).toPromise();
    }

    public deleteReportFileTemplate(id: number): Promise<any> {
        return this.http.delete<any>(this.restUrl + '/api/report-filetemplate/' + id).toPromise();
    }

    public deleteFolder(id: number): Promise<any> {
        return this.http.delete<any>(this.restUrl + '/api/report-folders/' + id).toPromise();
    }

    public pushReportFile(file: File): Promise<any> {
        const body: FormData = new FormData();
        body.append('uploadFile', file, file.name);
        return this.http.post<any>(this.restUrl + '/api/file-storage', body).toPromise();
    }

    public postCustomOptions(id, options): Promise<any> {
        return this.http.post<any>(this.restUrl + '/api/report-template/' + id + '/options', options).toPromise();
    }

    public getReportFileNameOptions(templateId: number): Promise<ICustomOptionsTemplate> {
        return this.http
            .get<ICustomOptionsTemplate>(this.restUrl + `/api/report-template/${templateId}/filename-options`)
            .toPromise();
    }

    public postReportFileNameOptions(templateId: number, template: ICustomOptionsTemplate): Promise<void> {
        return this.http
            .post<void>(this.restUrl + `/api/report-template/${templateId}/filename-options`, template)
            .toPromise();
    }
}
