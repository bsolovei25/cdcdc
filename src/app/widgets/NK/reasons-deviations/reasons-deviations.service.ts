import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

@Injectable()
export class ReasonsDeviationsService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getData<T>(transferIdParam: number): Promise<T> {
        try {
            return await this.http
                .get<T>(`${this.restUrl}/api/oil-control/transfer/${transferIdParam}/deviation`)
                .toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>((resolve) => null);
        }
    }

    public async getChartData<T>(transferIdParam: number, startDateParam: Date, endDateParam: Date): Promise<T> {
        try {
            return await this.http
                .get<T>(
                    `${
                        this.restUrl
                    }/api/oil-control/transfer/${transferIdParam}/graph/${startDateParam}/${endDateParam ??
                        new Date().toISOString()}`
                )
                .toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>((resolve) => null);
        }
    }
}
