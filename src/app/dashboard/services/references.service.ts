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

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public getReference(): Observable<IReferenceTypes[]> {
        return this.http.get(this.restUrl + `/api/ref-book/ReferenceType`).pipe(
            map((data: IReferenceTypes[]) => {
                const localeData = this.mapData(data);
                return localeData;
            })
        );
    }

    public removeReference(id: number): void {
        this.http.delete(this.restUrl + '/api/ref-book/ReferenceType/' + id).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public removeRecord(id: number): void {
        this.http.delete(this.restUrl + '/api/ref-book/ReferenceColumn/' + id).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public pushReference(reference) {
        const newReference: IReferenceTypes = new (class implements IReferenceTypes {
            name = reference.name;
        })();
        return this.http.post(this.restUrl + '/api/ref-book/ReferenceType', newReference).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public pushColumnReference(records) {
        return this.http.post(this.restUrl + '/api/ref-book/ReferenceColumn/', records).subscribe(
            (ans) => {},
            (error) => console.log(error)
        );
    }

    public mapData(data: IReferenceTypes[]): IReferenceTypes[] {
        return data;
    }

    async orderColumnReference(columns): Promise<any>{
        try {
            return this.http.post(this.restUrl + '/api/ref-book/ReferenceColumn/Order', columns).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEditColumn(body): Promise<any> {
        try {
            return this.http.put(this.restUrl + '/api/ref-book/ReferenceColumn', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEditRef(body): Promise<any> {
        try {
            return this.http.put(this.restUrl + '/api/ref-book/ReferenceType', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    // async getType(): Promise<IReferenceColumnsType[]> {
    //     try {
    //         return this.http
    //             .get<IReferenceColumnsType[]>(this.restUrl + '/api/notification-reference/category')
    //             .toPromise();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
}
