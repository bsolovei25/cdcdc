import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { IReferenceTypes, IReferenceColumnsType, IReferenceColumns } from '../models/references';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ReferencesService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public getReference(): Observable<IReferenceTypes[]> {
        return this.http.get<IReferenceTypes[]>(this.restUrl + `/api/ref-book/ReferenceType`);
    }

    public getColumns(id: number): Observable<IReferenceColumns[]> {
        return this.http.get<IReferenceColumns[]>(this.restUrl + `/api/ref-book/ReferenceColumn/` + id + '/all');
    }

    public getTableReference(id: number): Observable<any[]> {
        return this.http.get<any[]>(this.restUrl + `/api/ref-book/ReferenceData/` + id + '/tree');
    }

    public removeReference(id: number): Observable<IReferenceTypes> {
        return this.http.delete<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType/' + id);
    }

    public removeRecord(id: number): Observable<IReferenceColumns> {
        return this.http.delete<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn/' + id);
    }

    public pushReference(reference: IReferenceTypes): Observable<IReferenceTypes> {
        return this.http.post<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType', reference);
    }

    public pushColumnReference(records: IReferenceColumns): Observable<IReferenceColumns> {
        return this.http.post<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn/', records);
    }

    public orderColumnReference(columns: any): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/ref-book/ReferenceColumn/Order', JSON.stringify(columns));
    }

    public putEditRef(body): Observable<IReferenceTypes> {
        return this.http.put<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType', body);
    }

    public putEditColumn(body): Observable<IReferenceColumns> {
        return this.http.put<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn', body);
    }
}
