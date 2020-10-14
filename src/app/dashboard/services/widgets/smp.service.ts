import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import {
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
    public getProductionProgress(): Observable<IProgressIndicators> {
        const url: string = `assets/mock/SMP/productionProgress.json`;
        return this.http.get<IProgressIndicators>(url);
    }
}
