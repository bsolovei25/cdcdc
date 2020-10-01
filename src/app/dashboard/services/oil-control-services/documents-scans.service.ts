import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IDocumentsScans } from '../../models/oil-document.model';
import { filter } from 'rxjs/operators';
import { IHeaderDate } from '../../models/i-header-date';

@Injectable({
    providedIn: 'root'
})
export class DocumentsScansService {

    private restUrl: string;

    public documentScansLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public currentDocumentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public currentDocumentUrl: Observable<string> = this.currentDocumentUrl$
        .asObservable();

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    constructor(
        private http: HttpClient,
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    public async getDocumentList(): Promise<IDocumentsScans[]> {
        const documents = await
            this.http.get<IDocumentsScans[]>(`${this.restUrl}/api/oil-control/Passport`).toPromise();
        documents.map((doc) => { doc.date = new Date(doc.date); doc.isActive = false; });
        return documents;
    }

    public async getDocumentView(id: number): Promise<string> {
        const blob = await this.http.get(`${this.restUrl}/api/oil-control/Passport/${id}/view`, {responseType: 'blob'}).toPromise();
        return window.URL.createObjectURL(blob);
    }

    public async deleteDocument(id: number): Promise<any> {
        return this.http.delete(`${this.restUrl}/api/oil-control/Passport/${id}`).toPromise();
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }
}
