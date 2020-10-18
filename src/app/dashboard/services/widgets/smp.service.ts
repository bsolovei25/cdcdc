import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    IGetData,
} from '../../models/SMP/performance-progress-indicators.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SmpService {

    constructor(private http: HttpClient) {

    }
    public getProductionProgress(): Observable<IGetData> {
        const url: string = `assets/mock/SMP/productionProgress.json`;
        return this.http.get<IGetData>(url);
    }
}
