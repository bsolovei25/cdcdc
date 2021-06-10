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

    public async getTableContent(startTime: string, endTime: string): Promise<ISouStreamsTableContent[]> {
        // // startTime = 2020-02-13 endTime = 2020-02-15
        // const params = new HttpParams()
        //     .set('startTime', startTime)
        //     .set('endTime', endTime);
        // return await this.http.get<ISouStreamsTableContent[]>(this.restUrl +
        //     `/api/Oms/transfer/${startTime}&${endTime}isOpen=false`).toPromise();
        return await this.http.get<ISouStreamsTableContent[]>('http://192.168.0.12:6782/api/testUd').toPromise();
    }
}
