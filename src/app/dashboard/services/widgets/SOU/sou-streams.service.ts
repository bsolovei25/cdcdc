import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

export interface ISouStreamsTableContent {
    isMultiple: boolean,
    UID: string;
    flow: string;
    userName: string;
    sourceName: string;
    destinationName: string;
    startTime: string;
    endTime: string;
    sourceProduct: string;
    destinationProduct: string;
    sourceMass: number;
    destinationMass: number;
    deltaMass: number;
    sourceType: string;
    destinationType: string;
    warningColor: string;
    isDelete: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class SouStreamsService {
    private restUrl: string;

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = this.configService.restUrl;
    }

    public async getTableContent(startTime: string, endTime: string): Promise<ISouStreamsTableContent[]> {
        const params = new HttpParams()
            .set('startTime', '2021-05-02')
            .set('endTime', '2021-05-04');
        return await this.http.get<ISouStreamsTableContent[]>
        (`https://dev-pfm-petroleumflowmanagement-ioms.funcoff.club/api/Transfer/transfer`,
            {params}).toPromise();
    }
}
