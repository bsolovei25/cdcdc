import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '@core/service/app-config.service';
import {
    ISouStreamsClient,
    ISouStreamsObject,
    ISouStreamsOperation,
    ISouStreamsSingleObject,
} from '@dashboard/models/SOU/sou-streams.model';

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
    private petroleumUrl: string = 'https://dev-pfm-petroleumflowmanagement-ioms.funcoff.club';

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = this.configService.restUrl;
    }

    public async getTableContent(startTime: string, endTime: string): Promise<ISouStreamsTableContent[]> {
        const params = new HttpParams()
            .set('startTime', '2021-05-02')
            .set('endTime', '2021-05-04');
        return await this.http.get<ISouStreamsTableContent[]>
        (`${this.petroleumUrl}/api/Transfer/transfer`,
            {params}).toPromise();
    }

    public getClients(): Observable<ISouStreamsClient[]> {
        return this.http.get<ISouStreamsClient[]>(`${this.petroleumUrl}/api/Transfer/clients`);
    }

    public getClientObjects(clientUID: string): Observable<ISouStreamsObject[]> {
        return this.http.get<ISouStreamsObject[]>(`${this.petroleumUrl}/api/Transfer/clients/objects/${clientUID}`);
    }

    public getObjectProducts(objectName: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.petroleumUrl}/api/Client/objects/${objectName}/products`);
    }

    public getObject(objectName: string): Observable<ISouStreamsSingleObject> {
        return this.http.get<ISouStreamsSingleObject>(`${this.petroleumUrl}/api/Client/objects/${objectName}`);
    }

    public createOperation(operation: ISouStreamsOperation): Observable<unknown> {
        return this.http.post<unknown>(`${this.petroleumUrl}/api/Transfer/transfer`, operation);
    }
}
