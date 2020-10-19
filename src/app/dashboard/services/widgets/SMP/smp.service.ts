import { IAllCrude } from './../../../models/SMP/implementation-plan.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

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

    constructor(private http: HttpClient, private configService: AppConfigService) {
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

    async getProductionProgress(): Promise<any[]> {
        return this.http.get<any[]>(this.smpUrl + `/api/smp/getProductionProgress`, this.options)
            .toPromise();
    }

    async getAllCrude(): Promise<IAllCrude> {
        return this.http.get<IAllCrude>(this.smpUrl + `/api/smp/getAllCrude`, this.options)
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
