import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { IReferenceTypes, IReferenceColumnsType } from '../models/references';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ReferencesService {
    private restUrl: string;

    public testUrl: string = "http://deploy.funcoff.club:6880";

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public getReference(): Observable<IReferenceTypes[]> {
        return this.http.get(this.testUrl + `/api/ReferenceType`).pipe(
            map((data: IReferenceTypes[]) => {
                const localeData = this.mapData(data);
                return localeData;
            })
        );
    }

    public removeReference(reference: string): void {
        this.http.delete(this.testUrl + '/api/user-management/widget/' + reference).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public pushReference(reference) {
        const newReference: IReferenceTypes = new (class implements IReferenceTypes {
            name = reference.name;
        })();
        return this.http.post(this.testUrl + '/api/ref-book/ReferenceType', newReference).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public mapData(data: IReferenceTypes[]): IReferenceTypes[] {
        return data;
    }

    async getType(): Promise<IReferenceColumnsType[]> {
        try {
            return this.http
                .get<IReferenceColumnsType[]>(this.restUrl + '/api/notification-reference/category')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
