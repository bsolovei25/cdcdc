import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { BehaviorSubject } from 'rxjs';
import { IEncodedFileToSave } from '../../../widgets/NK/document-coding/components/document-coding-menu/document-coding-menu.component';
import { IOilFilter } from '../../models/oil-operations';

@Injectable({
    providedIn: 'root',
})
export class DocumentCodingService {
    private restUrl: string;

    public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public closeAlert(): void {
        this.alertWindow$.next(null);
    }

    public async getFilterList<T>(filter: 'tanks' | 'laboratories' | 'groups'): Promise<T[]> {
        try {
            return await this.http.get<T[]>(`${this.restUrl}/api/oil-control/${filter}`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T[]>((resolve) => []);
        }
    }

    public async getProductListByFilter<T>(
        labs: IOilFilter[] | null = null,
        groups: IOilFilter[] | null = null
    ): Promise<T[]> {
        const filterQuery = this.combineMultiFilterRequest(labs, groups);
        try {
            return await this.http
                .get<T[]>(`${this.restUrl}/api/oil-control/productsbyfilter${labs || groups ? filterQuery : ''}`)
                .toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T[]>((resolve) => []);
        }
    }

    public async passportSave(file: IEncodedFileToSave): Promise<void> {
        try {
            return await this.http.post<void>(`${this.restUrl}/api/oil-control/passport/bddk`, file).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<void>(null);
        }
    }

    private combineMultiFilterRequest(labs: IOilFilter[] | null, groups: IOilFilter[] | null): string {
        if (!labs || !groups) {
            return;
        }
        let result = '?';
        labs.forEach((filter) => {
            result = result + 'LabIds=' + filter.id + '&';
        });
        groups.forEach((filter) => {
            result = result + 'GroupIds=' + filter.id + '&';
        });
        return result.substring(0, result.length - 1);
    }
}
