import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServerConfiguratorService {
  private restUrl: string;

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
   }

   public getReportTemplate(): Observable<any[]> {
    return this.http.get<any[]>(this.restUrl + '/api/report-template/all');
}
}
