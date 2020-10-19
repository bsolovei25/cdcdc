import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IGetData } from '../../../models/SMP/performance-progress-indicators.model';

@Injectable({
    providedIn: 'root'
})
export class SmpService {
    private readonly smpUrl: string;
    private readonly options: { headers: HttpHeaders } = {
        headers: new HttpHeaders({
            AuthenticationType: 'windows'
        })
    };

    constructor( private configService: AppConfigService, private http: HttpClient) {
        this.smpUrl = configService.smpUrl;
        console.log();
        a;
        async function a(): Promise<void> {
            await this.getQualityOrdering();
        }

    }

    async getQualityOrdering(): Promise<any[]> {
        return this.http.get<any[]>(this.smpUrl + `/api/smp/getQualityOrdering`, this.options)
            .toPromise();
    }

    async getProductionProgress(): Promise<IGetData> {
        // return this.http.get<IGetData>(`assets/mock/SMP/productionProgress.json`)// расскомментить для проверки
        return this.http.get<IGetData>(this.smpUrl + `/api/smp/getProductionProgress`, this.options)
            .toPromise();
    }

    async getAllCrude(): Promise<any[]> {
        return this.http.get<any[]>(this.smpUrl + `/api/smp/getAllCrude`, this.options)
            .toPromise();
    }

    async getDataProgressGroup(): Promise<any[]> {
        return this.http.get<any[]>(this.smpUrl + `/api/smp/getDataProgressGroup`, this.options)
            .toPromise();
    }

    async getDeviationCard(): Promise<any[]> {
        return this.http.get<any[]>(this.smpUrl + `/api/smp/getDeviationCard`, this.options)
            .toPromise();
    }

}
