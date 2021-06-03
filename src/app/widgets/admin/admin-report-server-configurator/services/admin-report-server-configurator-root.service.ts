import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IReportFile,
    IReportTemplate,
    ISystemOptions,
    IFolder,
    IFileTemplate,
    IPostSystemOptionsTemplate,
    ICustomOptionsTemplate,
    ICustomOptions,
} from '@dashboard/models/ADMIN/report-server.model';
import {
    IReportFileUploadResponse, IReportFolder,
    IReportFolderCreateRequest, IReportFoldersResponse
} from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminReportServerConfiguratorRootService {

    public selectedFolderId: number = null;

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

    public postReportFileTemplate(body: unknown): Promise<IFileTemplate> {
        return this.http.post<IFileTemplate>(this.restUrl + '/api/report-filetemplate/loaded', body).toPromise();
    }

    public postSystemOptions(id: unknown, options: unknown): Promise<IPostSystemOptionsTemplate> {
        return this.http
            .post<IPostSystemOptionsTemplate>(this.restUrl + '/api/report-template/' + id + '/system-options', options)
            .toPromise();
    }

    public putReportFileTemplate(filetemplate: unknown): Promise<IReportTemplate> {
        return this.http.put<IReportTemplate>(this.restUrl + '/api/report-filetemplate', filetemplate).toPromise();
    }

    public putReportTemplate(template: unknown): Promise<IReportTemplate> {
        return this.http.put<IReportTemplate>(this.restUrl + '/api/report-template', template).toPromise();
    }

    public deleteReportTemplate(id: number): Promise<IReportTemplate> {
        return this.http.delete<IReportTemplate>(this.restUrl + '/api/report-template/' + id).toPromise();
    }

    /*
    * @deprecated use uploadFile
    * */
    public postReportTemplate(template: unknown): Promise<IReportTemplate> {
        return this.http.post<IReportTemplate>(this.restUrl + '/api/report-template', template).toPromise();
    }

    /*
    * @deprecated use createFolder
    * */
    public postTemplateFolder(folder: unknown): Promise<unknown> {
        return this.http.post<unknown>(this.restUrl + '/api/report-folders', folder).toPromise();
    }

    public putFolderTemplate(folder: { name: string, parentFolderId: number, id: number }): Promise<unknown> {
        return this.http.put<unknown>(this.restUrl + '/api/report-folders', folder).toPromise();
    }

    public deleteReportFileTemplate(id: number): Promise<unknown> {
        return this.http.delete<unknown>(this.restUrl + '/api/report-filetemplate/' + id).toPromise();
    }

    public deleteFolder(id: number): Promise<unknown> {
        return this.http.delete<unknown>(this.restUrl + '/api/report-folders/' + id).toPromise();
    }

    public pushReportFile(file: File): Promise<unknown> {
        const body: FormData = new FormData();
        body.append('uploadFile', file, file.name);
        return this.http.post<unknown>(this.restUrl + '/api/file-storage', body).toPromise();
    }

    public postCustomOptions(id: unknown, options: unknown): Promise<unknown> {
        return this.http.post<unknown>(this.restUrl + '/api/report-template/' + id + '/options', options).toPromise();
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

    /*
    * Files
    * */

    public getFile(id: number): Promise<unknown> {
        return this.http
            .get<unknown>(`${this.restUrl}/api/ref-book/Files/${id}`)
            .toPromise();
    }

    public deleteFile(id: number): Promise<unknown> {
        return this.http
            .delete<unknown>(`${this.restUrl}/api/ref-book/Files/${id}/`)
            .toPromise();
    }

    public uploadFile(fileName: string, description: string, uploadFIle: File, folderId: number): Observable<IReportFileUploadResponse> {
        const formData = new FormData();
        formData.append('fileName', fileName);
        formData.append('description', description);
        formData.append('uploadFIle', uploadFIle);
        formData.append('folderId', String(folderId));

        return this.http
            .post<IReportFileUploadResponse>(`${this.restUrl}/api/ref-book/Files/`, formData);
    }

    /*
    * Folders
    * */

    public getFolders(): Observable<IReportFoldersResponse> {
        return this.http
            .get<IReportFoldersResponse>(`${this.restUrl}/api/ref-book/Folders/all`);
    }

    public getFolder(id: number): Observable<IReportFolder> {
        return this.http
            .get<IReportFolder>(`${this.restUrl}/api/ref-book/Folders/${id}`);
    }

    public deleteFolder2(id: number): Promise<unknown> {
        return this.http
            .delete<unknown>(`${this.restUrl}/api/ref-book/Folders/${id}/`)
            .toPromise();
    }

    public createFolder(name: string, parentFolderId: number): Observable<unknown> {
        const folder: IReportFolderCreateRequest = {
            name,
            parentFolderId,
        }

        return this.http
            .post<unknown>(`${this.restUrl}/api/ref-book/Folders`, folder);
    }

    public updateFolder(folder: unknown): Promise<unknown> {
        return this.http
            .put<unknown>(`${this.restUrl}/api/ref-book/Folders`, folder)
            .toPromise();
    }
}
