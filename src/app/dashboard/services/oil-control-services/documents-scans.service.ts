import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { IDocumentsScan } from '../../models/oil-document.model';
import { IQualityDocsRecord } from '../../../widgets/NK/quality-docs-panel/quality-docs-panel.component';

export interface IOilControlPassportOpts {
    StartTime?: Date;
    EndTime?: Date;
    PassportName?: string;
    ProductIds?: number[];
    GroupIds?: number[];
    TankIds?: number[];
    IsBlocked?: boolean;
    ArmName?: string;
    SearchLike?: string;
}

@Injectable({
    providedIn: 'root',
})
export class DocumentsScansService {
    private readonly BATCH_SIZE: number = 50;

    private restUrl: string;

    public data$: BehaviorSubject<IQualityDocsRecord[]> = new BehaviorSubject<IQualityDocsRecord[]>(null);

    public documentScansLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public currentDocumentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public currentDocumentUrl: Observable<string> = this.currentDocumentUrl$.asObservable();

    public currentDocument$: BehaviorSubject<IDocumentsScan | null> = new BehaviorSubject<IDocumentsScan>(null);
    public currentDocument: Observable<IDocumentsScan | null> = this.currentDocument$.asObservable();

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getDocumentList(): Promise<IDocumentsScan[]> {
        const documents = await this.http.get<IDocumentsScan[]>(`${this.restUrl}/api/oil-control/Passport`).toPromise();
        documents.map((doc) => {
            doc.date = new Date(doc.date);
        });
        return documents;
    }

    public async getDocumentView(id: string): Promise<string> {
        const blob = await this.http
            .get(`${this.restUrl}/api/oil-control/Passport/${id}/view`, { responseType: 'blob' })
            .toPromise();
        return window.URL.createObjectURL(blob);
    }

    public async getDocumentInfo(id: number): Promise<any> {
        return this.http.get(`${this.restUrl}/api/oil-control/Passport/${id}`).toPromise();
    }

    public async deleteDocument(id: string): Promise<any> {
        return this.http.delete(`${this.restUrl}/api/oil-control/Passport/${id}`).toPromise();
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }

    public async passportBlockUnblock(id: number, action: 'block' | 'unblock'): Promise<any> {
        return this.http.get(`${this.restUrl}/api/oil-control/Passport/${action}/${id}`).toPromise();
    }

    public async getPassportsByFilter(lastId: number, options: IOilControlPassportOpts): Promise<IQualityDocsRecord[]> {
        try {
            return await this.http
                .get<IQualityDocsRecord[]>(
                    this.restUrl +
                    `/api/oil-control/Passport/passportsbyfilter?${this.getOptionString(lastId, options)}`
                ).toPromise()
        } catch (error) {
            console.error(error);
        }
    }

    private getOptionString(lastId: number, options: IOilControlPassportOpts): string {
        let res = `take=${this.BATCH_SIZE}&lastId=${lastId}`;
        if (options.StartTime) {
            res += `&StartTime=${options.StartTime.toISOString()}`;
        }
        if (options.EndTime) {
            res += `&EndTime=${options.EndTime.toISOString()}`;
        }
        if (options.PassportName) {
            res += `&PassportName=${options.PassportName}`;
        }
        if (options.SearchLike) {
            res += `&SearchLike=${options.SearchLike}`
        }
        if (options.ProductIds?.length) {
            options.ProductIds.forEach((id) => {
                res += `&ProductIds=${id}`;
            });
        }
        if (options.GroupIds?.length) {
            options.GroupIds.forEach((id) => {
                res += `&GroupIds=${id}`;
            });
        }
        if (options.TankIds?.length) {
            options.TankIds.forEach((id) => {
                res += `&TankIds=${id}`;
            });
        }
        if (options.IsBlocked) {
            res += `&IsBlocked=${options.IsBlocked}`;
        }
        if (options.ArmName) {
            res += `&IsBlocked=${options.ArmName}`;
        }
        return res;
    }
}
