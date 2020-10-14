import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IPerfProgCircle,
    IPerfProgPark,
    IProgressIndicators
} from '../../models/SMP/performance-progress-indicators.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SmpService {
    private readonly restUrl: string;

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
    public getProductionProgress(): Observable<{data: IProgressIndicators}> {
        const url: string = `assets/mock/SMP/productionProgress`;
        return this.http.get<{data: IProgressIndicators}>(url);
    }
}
