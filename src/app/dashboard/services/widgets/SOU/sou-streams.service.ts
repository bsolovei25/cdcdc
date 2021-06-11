import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

interface ISouStreamsTableContent {
    UID?: string;
    SourceName: string;
    DestinationName: string;
    StartTime: string;
    EndTime?: string;
    SourceProduct: string;
    DestinationProduct: string;
    SourceMass?: number;
    DestinationMass?: number;
    SourceClient: string;
    DestinationClient: string;
    DeltaMass: number;
    SourceType: string;
    DestinationType: string;
    WarningColor: string;
    IsDelete: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class SouStreamsService {
    private restUrl: string;

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = this.configService.restUrl;
    }

    public async getTableContent(startTime: string, endTime: string): Promise<any> {
        const params = new HttpParams()
            .set('startTime', startTime)
            .set('endTime', endTime)
            .set('client', 'test');
        return await this.http.get<any>
        (`https://dev-pfm-petroleumflowmanagement-ioms.funcoff.club/api/Transfer/transfer`,
            {params}).toPromise();
    }
}
