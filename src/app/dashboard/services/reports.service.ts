import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReportsService {

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getReportsTemplate(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + `/api/report-template/all`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getTemplate(id: number): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + `/api/report-template/${id}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postTemplate(id: number, body): Promise<any> {
        return this.http
            .post<any>(this.restUrl + `/api/reporting/${id}/template/create`, body)
            .toPromise();
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


}
