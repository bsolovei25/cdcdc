import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IOilDocument } from '../../models/oil-document.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentsScansService {

    private restUrl: string;

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    constructor(
        private http: HttpClient,
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    public async getDocumentList(): Promise<IOilDocument[]> {
        const documents = await
            this.http.get<IOilDocument[]>(`${this.restUrl}/api/oilcontrol/Passport`).toPromise();
        documents.map((doc) => { doc.date = new Date(doc.date); });
        return documents;
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }
}
