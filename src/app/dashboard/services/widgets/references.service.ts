import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IReferenceTypes, IReferenceColumnsType, IReferenceColumns, IReferenceData } from '../../models/ADMIN/references';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Injectable({
    providedIn: 'root',
})
export class ReferencesService {
    private restUrl: string;

    private _reference$: BehaviorSubject<IReferenceTypes[]> = new BehaviorSubject(null);


    public reference$: Observable<IReferenceTypes[]> = this._reference$.asObservable().pipe(filter(i => i !== null));

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.getRestReference();
    }

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    public getRestReference(): void {
        this.getReference().subscribe(
            (data) => {
                this._reference$.next(data);
            },
            (err) => {
                console.error('error rest', err);
            },
        );
    }

    public getReference(): Observable<IReferenceTypes[]> {
        return this.http.get<IReferenceTypes[]>(this.restUrl + `/api/ref-book/ReferenceType`);
    }

    public getColumns(id: number): Observable<IReferenceColumns[]> {
        return this.http.get<IReferenceColumns[]>(this.restUrl + `/api/ref-book/ReferenceColumn/` + id + '/all');
    }

    public getTableReference(id: number): Observable<IReferenceData> {
        return this.http.get<IReferenceData>(this.restUrl + `/api/ref-book/ReferenceData/` + id + '/tree');
    }

    public removeReference(id: number): Observable<IReferenceTypes> {
        return this.http.delete<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType/' + id);
    }

    public removeRecord(id: number): Observable<IReferenceColumns> {
        return this.http.delete<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn/' + id);
    }

    public removeRecordWithColumn(id: number): Observable<IReferenceColumns> {
        return this.http.delete<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn/' + id + '/force');
    }

    public removeDataRecord(id: number): Observable<any> {
        return this.http.delete<any>(this.restUrl + '/api/ref-book/ReferenceData/' + id);
    }

    public pushReference(reference: IReferenceTypes): Observable<IReferenceTypes> {
        return this.http.post<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType', reference);
    }

    public pushColumnReference(records: IReferenceColumns): Observable<IReferenceColumns> {
        return this.http.post<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn/', records);
    }

    public pushReferenceData(records: any): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/ref-book/ReferenceData/', records);
    }


    public orderColumnReference(columns: any): Observable<any> {
        return this.http.post<any>(this.restUrl + '/api/ref-book/ReferenceColumn/Order', columns);
    }

    public putEditRef(body): Observable<IReferenceTypes> {
        return this.http.put<IReferenceTypes>(this.restUrl + '/api/ref-book/ReferenceType', body);
    }

    public putEditColumn(body): Observable<IReferenceColumns> {
        return this.http.put<IReferenceColumns>(this.restUrl + '/api/ref-book/ReferenceColumn', body);
    }

    public putEditData(body): Observable<any> {
        return this.http.put<any>(this.restUrl + '/api/ref-book/ReferenceData', body);
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }
}
