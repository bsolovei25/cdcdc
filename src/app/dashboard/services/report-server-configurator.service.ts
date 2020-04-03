import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable } from 'rxjs';
import { IFileTemplate } from '../models/report-server';
import { IReportTemplate } from '../components/report/reports.component';

@Injectable({
  providedIn: 'root'
})
export class ReportServerConfiguratorService {
  private restUrl: string;
  private restFileUrl: string = '';

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.restFileUrl = configService.fsUrl;
  }

  public getReportFileTemplate(): Observable<any[]> {
    return this.http.get<any[]>(this.restUrl + '/api/report-filetemplate/all');
  }

  public getReportTemplate(): Observable<IReportTemplate[]> {
    return this.http.get<IReportTemplate[]>(this.restUrl + '/api/report-template/all');
  }

  public getTepmplate(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.restUrl + '/api/report-filetemplate/' + id + '/templates');
  }

  public getOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.restUrl + '/api/report-template/system-option/all');
  }


  public pushReportFile(file: Blob): Observable<any> {
    const body: FormData = new FormData();
    const now: number = Date.now();
    body.append('uploadFile', file, `report_${now}.xlsm`);

    return this.http.post<any>(this.restFileUrl, body);
  }

  public postReportFileTemplate(body): Observable<IFileTemplate> {
    return this.http.post<IFileTemplate>(this.restUrl + '/api/report-filetemplate/loaded', body);
  }

  public postReportTemplate(template): Observable<any>{
    return this.http.post<any>(this.restUrl + '/api/report-template/', template);
  }

  public putReportFileTemplate(filetemplate): Observable<any>{
    return this.http.put<any>(this.restUrl + '/api/report-filetemplate/', filetemplate);
  }

  public deleteReportFileTemplate(id: number): Observable<any>{
    return this.http.delete<any>(this.restUrl + '/api/report-filetemplate/' + id);
  }

}
